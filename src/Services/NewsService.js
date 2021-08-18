import { Post, Put, Get, Delete } from './privateApiService';

class NewsService {
  static async create(news) {
    const response = await Post('/news', { ...news });
    return response;
  }

  static async update(news) {
    const response = await Put('/news', news.id, { ...news });
    return response;
  }

  static async remove(id) {
    const response = await Delete('/news', id);
    return response;
  }

  static async getNews(id) {
    const response = await Get('/news', id ? id : null);
    return response;
  }

  static async search(value) {
    const response = await Get(`/news?search=${value}`);
    return response;
  }
}

export default NewsService;
