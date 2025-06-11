# Modern Blog Application

A full-featured blog application built with Next.js, MongoDB, and NextAuth.js. This application allows users to create, read, update, and delete blog posts with user authentication.

## Features

- 🔐 User Authentication (Register/Login)
- ✍️ Create, Read, Update, and Delete Blog Posts
- 👤 User-specific Blog Management
- 🎨 Modern and Responsive UI with Tailwind CSS
- 📱 Mobile-friendly Design
- 🔄 Real-time Updates
- 🔒 Secure Authentication with NextAuth.js
- 🗄️ MongoDB Database Integration

## Prerequisites

- Node.js 18.x or later
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/modern-blog-app.git
   cd modern-blog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/blog-app
   MONGODB_DB=blog-app
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. Start MongoDB:
   - If using local MongoDB:
     ```bash
     # Start MongoDB service
     mongod
     ```
   - If using MongoDB Atlas:
     - Update MONGODB_URI in .env.local with your Atlas connection string

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
blog-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── create/            # Create blog page
│   ├── edit/              # Edit blog page
│   ├── login/             # Login page
│   └── register/          # Registration page
├── components/            # React components
├── lib/                   # Utility functions
├── models/                # Database models
└── public/               # Static files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/[id]` - Get a specific blog
- `PUT /api/blogs/[id]` - Update a blog
- `DELETE /api/blogs/[id]` - Delete a blog

## Technologies Used

- **Frontend:**
  - Next.js 14
  - React
  - Tailwind CSS
  - Axios
  - React Toastify

- **Backend:**
  - Next.js API Routes
  - MongoDB with Mongoose
  - NextAuth.js

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Running Production Build
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email your-email@example.com or open an issue in the GitHub repository.
