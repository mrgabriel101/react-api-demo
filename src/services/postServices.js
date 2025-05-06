import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
});

const getPosts = () => api.get('/posts');
const deletePost = (id) => api.delete(`/posts/${id}`);
const createPost = (post) => api.post('/posts', post);
const updatePost = (id, post) => api.put(`/posts/${id}`, post);

export { getPosts, deletePost, createPost, updatePost };
