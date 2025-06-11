const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchApi(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// Blog API functions
export const blogApi = {
  getAll: () => fetchApi('/blogs'),
  getById: (id) => fetchApi(`/blogs/${id}`),
  create: (data) => fetchApi('/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchApi(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchApi(`/blogs/${id}`, {
    method: 'DELETE',
  }),
};

// Subscription API functions
export const subscriptionApi = {
  getAll: () => fetchApi('/subscriptions'),
  create: (data) => fetchApi('/subscriptions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchApi(`/subscriptions/${id}`, {
    method: 'DELETE',
  }),
}; 