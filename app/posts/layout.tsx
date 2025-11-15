
import Link from "next/link";
import { Home, PlusSquare, Search, User } from "lucide-react";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="flex items-center space-x-2">
            <Bird className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Nest</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/posts" className="text-gray-600 hover:text-blue-500"><Home /></Link>
            <Link href="/posts/create" className="text-gray-600 hover:text-blue-500"><PlusSquare /></Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500"><Search /></Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500"><User /></Link>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-white shadow-sm mt-12">
        <div className="container mx-auto p-4 text-center text-gray-600">
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
