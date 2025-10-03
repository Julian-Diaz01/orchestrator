import Link from 'next/link';
import { Button } from '@/components/ui';
import Header from '@/components/Header';
import { theme } from '@/lib/theme';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.primary[100]} 100%)` }}>
      <Header showAuth={true} />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl" style={{ color: theme.colors.text.primary }}>
            Orchestrate your{' '}
            <span className="relative whitespace-nowrap" style={{ color: theme.colors.primary[600] }}>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full"
                style={{ fill: `${theme.colors.primary[300]}70` }}
                preserveAspectRatio="none"
              >
                <path d="m203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">social media</span>
            </span>{' '}
            posts with ease
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight" style={{ color: theme.colors.text.secondary }}>
            Plan, schedule, and automate your social media content across all platforms. 
            Join thousands of creators and businesses using Orchestrator to streamline their social media strategy.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link href="/login">
              <Button variant="primary" size="lg">
                Get started
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="secondary" size="lg">
                <svg
                  aria-hidden="true"
                  className="h-3 w-3 flex-none mr-2"
                  style={{ fill: theme.colors.primary[600] }}
                >
                  <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                </svg>
                Watch demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl md:text-center">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl" style={{ color: theme.colors.text.primary }}>
              Everything you need for social media success
            </h2>
            <p className="mt-4 text-lg tracking-tight" style={{ color: theme.colors.text.secondary }}>
              Powerful features designed to streamline your social media strategy and boost engagement.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: theme.colors.text.primary }}>
                  <div className="h-5 w-5 flex-none rounded-full" style={{ backgroundColor: theme.colors.primary[600] }}></div>
                  Content Scheduling
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: theme.colors.text.secondary }}>
                  <p className="flex-auto">
                    Schedule posts across Instagram, Twitter, Facebook, and LinkedIn with our intuitive calendar interface.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: theme.colors.text.primary }}>
                  <div className="h-5 w-5 flex-none rounded-full" style={{ backgroundColor: theme.colors.primary[600] }}></div>
                  Analytics & Insights
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: theme.colors.text.secondary }}>
                  <p className="flex-auto">
                    Track engagement, reach, and performance with comprehensive analytics and detailed insights.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7" style={{ color: theme.colors.text.primary }}>
                  <div className="h-5 w-5 flex-none rounded-full" style={{ backgroundColor: theme.colors.primary[600] }}></div>
                  Content Creation
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7" style={{ color: theme.colors.text.secondary }}>
                  <p className="flex-auto">
                    Create engaging content with built-in templates, hashtag suggestions, and AI-powered recommendations.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: theme.colors.background.primary }}>
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: theme.colors.text.inverse }}>
              Ready to transform your social media?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8" style={{ color: theme.colors.text.secondary }}>
              Join thousands of creators and businesses who are already using Orchestrator to streamline their social media strategy.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  Start your free trial
                </Button>
              </Link>
              <Link href="#features" className="text-black text-sm font-semibold leading-6" style={{ color: theme.colors.text.primary }}>
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}