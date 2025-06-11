# Blog Application

A modern blog application built with Next.js, MongoDB, and NextAuth.js.

## Features

- User authentication (signup/login)
- Create, read, update, and delete blog posts
- Responsive design for desktop and mobile
- Pagination for blog listing
- Author-only edit/delete functionality
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- MongoDB database (local or Atlas)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=blog-app
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000.

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/auth/[...nextauth]` - Authentication endpoints
- `GET /api/blogs` - Get all blogs with pagination
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/[id]` - Get a single blog
- `PUT /api/blogs/[id]` - Update a blog
- `DELETE /api/blogs/[id]` - Delete a blog

## Technologies Used

- Next.js 14
- MongoDB with Mongoose
- NextAuth.js for authentication
- Tailwind CSS for styling
- Axios for API requests
- React Toastify for notifications

## Deployment

The application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or AWS.

## License

MIT
