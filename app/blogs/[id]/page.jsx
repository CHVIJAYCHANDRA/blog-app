'use client'
import Footer from '@/Components/Footer';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation';
import { getBlog } from '@/lib/api';

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const fetchBlogData = useCallback(async () => {
    try {
      const data = await getBlog(params.id);
      setBlog(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog post. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/" className="text-yellow-600 hover:text-yellow-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Blog post not found</p>
          <Link href="/" className="text-yellow-600 hover:text-yellow-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href='/'>
          <span className='text-2xl font-bold'>Blog App</span>
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] hover:bg-gray-100 transition-colors'>
          Get started →
        </button>
      </div>
      <div className='text-center my-24'>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{blog.title}</h1>
        <div className="mt-6">
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{blog.author}</p>
        </div>
      </div>
      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <div className='blog-content prose max-w-none' dangerouslySetInnerHTML={{__html: blog.description}} />
        
        <div className='my-24'>
          <p className='text-black font-semibold my-4'>Share this article on social media</p>
          <div className='flex gap-4'>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Facebook
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Twitter
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              Google+
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
