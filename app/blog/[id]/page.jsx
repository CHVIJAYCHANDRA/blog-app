'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '../../../components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BlogDetail({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${params.id}`);
      setBlog(response.data.blog);
    } catch (error) {
      toast.error('Error fetching blog');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      await axios.delete(`/api/blogs/${params.id}`);
      toast.success('Blog deleted successfully');
      router.push('/');
    } catch (error) {
      toast.error('Error deleting blog');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const isAuthor = session?.user?.id === blog.author._id;

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center justify-between mb-8">
            <div className="text-gray-600">
              By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
            </div>
            {isAuthor && (
              <div className="space-x-4">
                <button
                  onClick={() => router.push(`/edit/${params.id}`)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="prose max-w-none">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
} 