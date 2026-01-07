import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' });

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('tw_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const getTrips = (mine=false) => API.get(`/trips${mine ? '?mine=true' : ''}`).then(r=>r.data);
export const getTrip = (id) => API.get(`/trips/${id}`).then(r=>r.data);
export const createTrip = (formData) => API.post('/trips', formData).then(r=>r.data);
export const updateTrip = (id, formData) => API.put(`/trips/${id}`, formData).then(r=>r.data);
export const deleteTrip = (id) => API.delete(`/trips/${id}`).then(r=>r.data);
export const register = (payload) => API.post('/auth/register', payload).then(r=>r.data);
export const login = (payload) => API.post('/auth/login', payload).then(r=>r.data);

export default API;
