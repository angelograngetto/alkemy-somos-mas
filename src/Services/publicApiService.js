import axios from 'axios';

const baseURL = 'http://ongapi.alkemy.org/api';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Group: 54,
  },
});

export default {
  get: async (url, id) => {
    // In url use /slides, /activities, etc because there's already a baseurl
    try {
      const resp = await instance.get(`${url}${id ? `/${id}` : ''}`);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  },
  post: async (url, body) => {
    // In url use /slides, /activities, etc because there's already a baseurl
    try {
      const resp = await instance.post(url, body);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  },
};
