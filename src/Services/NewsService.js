import { Post, Put, Get, Delete } from './privateApiService';
const path = process.env.REACT_APP_NEWS_ENDPOINT;

class NewsService {
  static async create(news) {
    const response = await Post(path, { ...news });
    return response;
  }

  static async update(news) {
    const response = await Put(path, news.id, { ...news });
    return response;
  }

  static async remove(id) {
    const response = await Delete(path, id);
    return response;
  }

  static async getNews(id) {
    const response = await Get(path, id ? id : null);
    return response;
  }

  static async search(value) {
    const response = await Get(`${path}?search=${value}`);
    return response;
  }
}

export default NewsService;
