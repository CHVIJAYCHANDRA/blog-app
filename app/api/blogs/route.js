import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs - Get all blogs with pagination
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 6; // Number of blogs per page
    const skip = (page - 1) * limit;

    await connectDB();

    const [blogs, total] = await Promise.all([
      Blog.find()
        .populate('author', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      blogs,
      currentPage: page,
      totalPages,
      totalBlogs: total,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Error fetching blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in to create a blog' },
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

    const blog = await Blog.create({
      title,
      content,
      author: session.user.id,
    });

    return NextResponse.json(
      { success: true, message: 'Blog created successfully', blog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: 'Error creating blog' },
      { status: 500 }
    );
  }
} 