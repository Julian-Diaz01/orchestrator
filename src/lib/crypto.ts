// Minimal AES-GCM encryption/decryption helpers for securing OAuth tokens at rest
// Uses a 256-bit key provided via TOKEN_ENCRYPTION_KEY (base64-encoded)

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

function getCrypto(): Crypto {
  const cryptoObj: Crypto | undefined = (globalThis as unknown as { crypto?: Crypto }).crypto
  if (!cryptoObj || !('subtle' in cryptoObj)) {
    throw new Error('Web Crypto API not available in this runtime')
  }
  return cryptoObj
}

function getKeyBytes(): ArrayBuffer {
  const keyB64 = process.env.TOKEN_ENCRYPTION_KEY
  if (!keyB64) {
    throw new Error('TOKEN_ENCRYPTION_KEY env var is not set')
  }
  const keyRaw = Buffer.from(keyB64, 'base64')
  if (keyRaw.byteLength !== 32) {
    throw new Error('TOKEN_ENCRYPTION_KEY must be 32 bytes (base64-encoded)')
  }
  return keyRaw.buffer.slice(keyRaw.byteOffset, keyRaw.byteOffset + keyRaw.byteLength)
}

async function importAesKey(): Promise<CryptoKey> {
  const subtle = getCrypto().subtle
  return subtle.importKey('raw', getKeyBytes(), 'AES-GCM', false, ['encrypt', 'decrypt'])
}

export async function encryptString(plaintext: string): Promise<string> {
  const subtle = getCrypto().subtle
  const key = await importAesKey()
  const iv = getCrypto().getRandomValues(new Uint8Array(12))
  const cipherBuf = await subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    textEncoder.encode(plaintext)
  )
  // Concatenate iv + ciphertext for storage, base64 encode
  const combined = new Uint8Array(iv.byteLength + cipherBuf.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(cipherBuf), iv.byteLength)
  return Buffer.from(combined).toString('base64')
}

export async function decryptString(ciphertextB64: string): Promise<string> {
  const subtle = getCrypto().subtle
  const key = await importAesKey()
  const data = Buffer.from(ciphertextB64, 'base64')
  if (data.byteLength < 13) {
    throw new Error('Invalid ciphertext')
  }
  const iv = data.subarray(0, 12)
  const cipher = data.subarray(12)
  const plainBuf = await subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(iv) },
    key,
    cipher
  )
  return textDecoder.decode(plainBuf)
}

// Helpers for PKCE (used for Twitter OAuth 2.0)
export async function generateCodeVerifierAndChallenge(): Promise<{ verifier: string; challenge: string }> {
  const random = getCrypto().getRandomValues(new Uint8Array(32))
  const verifier = base64UrlEncode(random)
  const digest = await getCrypto().subtle.digest('SHA-256', textEncoder.encode(verifier))
  const challenge = base64UrlEncode(new Uint8Array(digest))
  return { verifier, challenge }
}

function base64UrlEncode(bytes: Uint8Array): string {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}


