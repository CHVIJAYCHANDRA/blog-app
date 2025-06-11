export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Go back home
        </a>
      </div>
    </div>
  );
} 