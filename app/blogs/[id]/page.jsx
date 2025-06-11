'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { getBlog } from '@/lib/api';

export default function BlogDetailPage() {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const fetchBlogData = async () => {
    try {
      const data = await getBlog(params.id);
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [params.id]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!blog) {
    return <div className="container mx-auto px-4 py-8">Blog not found</div>;
  }

  return (
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href='/'>
          <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
          Get started <Image src={assets.arrow} alt='' />
        </button>
      </div>
      <div className='text-center my-24'>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{blog.title}</h1>
        <Image className='mx-auto mt-6 border border-white rounded-full' src={blog.authorImg} width={60} height={60} alt='' />
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{blog.author}</p>
      </div>
      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image className='border-4 border-white' src={blog.image} width={800} height={480} alt='' />
        
        <div className='blog-content' dangerouslySetInnerHTML={{__html:blog.description}}>
          
        </div>
        <div className='my-24'>
          <p className='text-black font font-semibold my-4'>Share this article on social media</p>
          <div className='flex'>
            <Image src={assets.facebook_icon} width={50} alt='' />
            <Image src={assets.twitter_icon} width={50} alt='' />
            <Image src={assets.googleplus_icon} width={50} alt='' />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
