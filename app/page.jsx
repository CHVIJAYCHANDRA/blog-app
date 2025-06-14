import Header from '../components/Header';
import BlogList from '@/components/BlogList';

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Latest Blog Posts</h1>
        <BlogList />
      </div>
    </main>
  );
} 