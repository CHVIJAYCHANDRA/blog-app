import { render, screen } from '@testing-library/react';
import HomePage from './page';

// Mock the next-auth session
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        blogs: [
          {
            _id: '1',
            title: 'Test Blog',
            content: 'Test Content',
            author: { name: 'Test Author' },
            createdAt: new Date().toISOString(),
          },
        ],
        currentPage: 1,
        totalPages: 1,
        totalBlogs: 1,
      }),
  })
);

describe('HomePage', () => {
  it('renders blog list', async () => {
    render(<HomePage />);
    
    // Wait for the blog title to appear
    const blogTitle = await screen.findByText('Test Blog');
    expect(blogTitle).toBeInTheDocument();
    
    // Check if author name is displayed
    const authorName = screen.getByText('By Test Author');
    expect(authorName).toBeInTheDocument();
  });
}); 