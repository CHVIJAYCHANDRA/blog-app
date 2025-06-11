'use client'
import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import Image from 'next/image';
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
          <Image src={assets.logo} width={180} alt='Blog Logo' className='w-[130px] sm:w-auto' />
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] hover:bg-gray-100 transition-colors'>
          Get started <Image src={assets.arrow} alt='Arrow icon' />
        </button>
      </div>
      <div className='text-center my-24'>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{blog.title}</h1>
        <div className="mt-6">
          <Image 
            className='mx-auto border border-white rounded-full' 
            src={blog.authorImg || assets.profile_icon} 
            width={60} 
            height={60} 
            alt={`${blog.author}'s profile`} 
          />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{blog.author}</p>
        </div>
      </div>
      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <div className="relative w-full h-[480px] mb-8">
          <Image 
            className='border-4 border-white object-cover' 
            src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'} 
            fill
            alt={blog.title}
            priority
          />
        </div>
        
        <div className='blog-content prose max-w-none' dangerouslySetInnerHTML={{__html: blog.description}} />
        
        <div className='my-24'>
          <p className='text-black font-semibold my-4'>Share this article on social media</p>
          <div className='flex gap-4'>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image src={assets.facebook_icon} width={50} alt='Share on Facebook' />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image src={assets.twitter_icon} width={50} alt='Share on Twitter' />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image src={assets.googleplus_icon} width={50} alt='Share on Google+' />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
