import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs/[id] - Get a single blog
export async function GET(request, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update a blog
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in to update a blog' },
        { status: 401 }
      );
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Please provide title and content' },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json(
        { message: 'You are not authorized to update this blog' },
        { status: 403 }
      );
    }

    blog.title = title;
    blog.content = content;
    await blog.save();

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { message: 'Error updating blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 