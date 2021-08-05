import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ongapi.alkemy.org/public/api/',
});

export default axiosInstance;
