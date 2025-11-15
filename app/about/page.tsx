export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glassmorphism mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
            About Nest
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Nest is a social networking platform designed to provide a safe and engaging environment for users to connect with friends and family. Our mission is to foster a positive online community where people can share their experiences, discover new interests, and build meaningful relationships.
          </p>
        </div>
      </div>
    </div>
  );
}
