import Link from "next/link";
import { Home, PlusSquare, Search, User } from "lucide-react";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <header className="bg-primary p-4 shadow-lg flex justify-between items-center z-10 sticky top-0">
        <Link href="/" className="flex items-center space-x-2">
          {/* Using text-accent-foreground for the Nest logo text */}
          <Bird className="w-8 h-8 text-accent-foreground" />
          <h1 className="text-2xl font-bold text-accent-foreground">Nest</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/posts" className="text-accent-foreground hover:text-white transition-colors duration-200"><Home /></Link>
          <Link href="/posts/new" className="text-accent-foreground hover:text-white transition-colors duration-200"><PlusSquare /></Link>
          {/* New link for 'Connect' page */}
          <Link href="/connect" className="text-accent-foreground hover:text-white transition-colors duration-200"><Search /></Link>
          <Link href="/profile" className="text-accent-foreground hover:text-white transition-colors duration-200"><User /></Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-xl mb-8">
          <Link href="/posts/new" className="inline-block bg-accent text-accent-foreground py-2 px-4 rounded-lg shadow-md hover:shadow-glow font-semibold transition-all duration-300">
            Create New Post
          </Link>
        </div>
        {children}
      </main>
      <footer className="bg-primary p-4 shadow-inner mt-8">
        <div className="container mx-auto text-center text-accent-foreground text-sm">
          <p>&copy; 2024 Nest Social Networking. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Bird(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 17a2 2 0 0 1-2-2 2 2 0 0 1-2-2 2 2 0 0 1-2-2V5l4 2 4-2v5a2 2 0 0 1-2 2z" />
        <path d="m12 15-4 2 4 2 4-2-4-2z" />
      </svg>
    )
  }