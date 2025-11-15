import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="glassmorphism mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
              Nest Social Networking
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
              A safe and fun social network for you and your friends. Share your world, discover new things, and make lasting connections.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login" className="btn">
                Get started
              </Link>
              <Link href="/about" className="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
