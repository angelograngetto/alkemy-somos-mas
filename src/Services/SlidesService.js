import { Delete, Get, Post, Put } from './privateApiService';
const path = process.env.REACT_APP_SLIDES_ENDPOINT;
class SlidesService {
  static async getAll() {
    const response = await Get(path);
    return response.data;
  }

  static async getById(id) {
    const response = await Get(path, id);
    return response.data;
  }

  static async create(slide) {
    const response = await Post(path, slide);
    return response.data;
  }

  static async update(slide) {
    const response = await Put(path, slide.id, slide);
    return response.data;
  }

  static async delete(id) {
    const response = await Delete(path, id);
    return response.data;
  }
}

export default SlidesService;
