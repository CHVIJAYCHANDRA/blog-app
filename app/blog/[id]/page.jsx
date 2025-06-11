'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '../../../components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BlogPost({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${params.id}`);
        setBlog(response.data);
      } catch (error) {
        toast.error('Failed to fetch blog post');
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!session) {
      toast.error('You must be logged in to delete posts');
      return;
    }

    try {
      await axios.delete(`/api/blogs/${params.id}`);
      toast.success('Blog post deleted successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to delete blog post');
      console.error('Error deleting blog:', error);
    }
  };

  if (loading) {
    return (
      <main>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-600">Blog post not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="text-gray-600 mb-8">
            By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
          </div>
          <div className="prose max-w-none">
            {blog.content}
          </div>
          {session && session.user.email === blog.author && (
            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => router.push(`/edit/${params.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </article>
      </div>
    </main>
  );
} 