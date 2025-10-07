import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: async (email: string, username: string, password: string) => {
    const response = await api.post('/auth/signup', { email, username, password });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// User APIs
export const userAPI = {
  getProfile: async (username: string) => {
    const response = await api.get(`/users/${username}`);
    return response.data;
  },
  
  getUserPosts: async (username: string, offset = 0, limit = 20) => {
    const response = await api.get(`/users/${username}/posts`, {
      params: { offset, limit },
    });
    return response.data;
  },
  
  updateProfile: async (data: { username?: string; bio?: string; profile_picture?: string }) => {
    const response = await api.put('/users/me', data);
    return response.data;
  },
};

// Post APIs
export const postAPI = {
  create: async (data: { text: string; media_type?: string; media_data?: string; category?: string }) => {
    const response = await api.post('/posts/create', data);
    return response.data;
  },
  
  delete: async (postId: number) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },
  
  like: async (postId: number) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },
  
  addComment: async (postId: number, text: string) => {
    const response = await api.post(`/posts/${postId}/comments`, { text });
    return response.data;
  },
  
  getComments: async (postId: number) => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },
  
  deleteComment: async (commentId: number) => {
    const response = await api.delete(`/posts/comments/${commentId}`);
    return response.data;
  },
};

// Feed API
export const feedAPI = {
  getFeed: async (limit = 20, offset = 0) => {
    const response = await api.get('/feed', {
      params: { limit, offset },
    });
    return response.data;
  },
};

export default api;
