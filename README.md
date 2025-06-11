# Blog Application

A modern blog application built with Next.js, featuring user authentication, blog creation, and management capabilities.

## Features

- User authentication (signup/login)
- Create, read, update, and delete blog posts
- Responsive design with Tailwind CSS
- MongoDB database integration
- Pagination for blog listings
- Author-only edit/delete functionality
- Modern UI with yellow and light blue color scheme

## Prerequisites

- Node.js 18.x or later
- MongoDB database
- npm or yarn package manager

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Update the variables with your values

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

Run the test suite:
```bash
npm test
```

## Project Structure

```
blog-app/
├── app/
│   ├── api/           # API routes
│   ├── blog/          # Blog pages
│   ├── create/        # Blog creation
│   ├── login/         # Authentication
│   └── register/      # User registration
├── components/        # Reusable components
├── lib/              # Utility functions and models
├── public/           # Static assets
└── styles/           # Global styles
```

## Technologies Used

- Next.js 14
- React
- MongoDB
- NextAuth.js
- Tailwind CSS
- Jest for testing

## Deployment

The application is deployed on Vercel and can be accessed at: [Your Deployment URL]

## Video Walkthrough

A video walkthrough of the application is available at: [Your Loom Video URL]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
