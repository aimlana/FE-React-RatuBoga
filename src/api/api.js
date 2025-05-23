import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '513MA-77EI7I8A-101278RB',
  },
});

export default API;
