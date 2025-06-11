'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function BlogPostPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${params.id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch blog post');
      }

      setBlog(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete blog post');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      setError(error.message);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-sky-800 mb-4">Error</h2>
          <p className="text-sky-600 mb-4">{error}</p>
          <Link
            href="/"
            className="text-yellow-500 hover:text-yellow-600"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-sky-800 mb-4">Blog Post Not Found</h2>
          <Link
            href="/"
            className="text-yellow-500 hover:text-yellow-600"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = session?.user?.id === blog.author._id;

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-8">
              <Link
                href="/"
                className="text-yellow-500 hover:text-yellow-600 mb-4 inline-block"
              >
                ← Back to all posts
              </Link>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-sky-800 mb-4">
                  {blog.title}
                </h1>
                {isAuthor && (
                  <div className="flex space-x-4">
                    <Link
                      href={`/blog/${blog._id}/edit`}
                      className="text-sky-600 hover:text-sky-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center text-sm text-sky-500">
                <span>By {blog.author.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="prose max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-sky-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 