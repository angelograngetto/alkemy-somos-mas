import axios from 'axios';

const baseURL = 'http://ongapi.alkemy.org/api';

const axiosInstance = axios.create({ baseURL });

export default axiosInstance;
