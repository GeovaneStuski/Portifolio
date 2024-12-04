import axios from 'axios';

const ApiUrl = import.meta.env.VITE_API_URL;

export const ApiRequester = axios.create({
  baseURL: ApiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});