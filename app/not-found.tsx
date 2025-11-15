import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
