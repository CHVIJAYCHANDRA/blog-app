import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog App',
  description: 'A modern blog application built with Next.js',
  keywords: ['blog', 'next.js', 'react', 'javascript'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-sky-50">
            <nav className="bg-yellow-400 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <a href="/" className="text-xl font-bold text-sky-800">
                        Blog App
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {session?.user ? (
                      <div className="flex items-center space-x-4">
                        <span className="text-sky-800">
                          Welcome, {session.user.name}
                        </span>
                        <form action="/api/auth/signout" method="POST">
                          <button
                            type="submit"
                            className="text-sky-800 hover:text-sky-900"
                          >
                            Sign out
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <a
                          href="/login"
                          className="text-sky-800 hover:text-sky-900"
                        >
                          Sign in
                        </a>
                        <a
                          href="/register"
                          className="text-sky-800 hover:text-sky-900"
                        >
                          Register
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
