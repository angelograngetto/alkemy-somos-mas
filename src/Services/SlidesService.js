import { Delete, Get, Post, Put } from './privateApiService';

class SlidesService {
  static async getAll() {
    const response = await Get('/slides');
    return response.data;
  }

  static async getById(id) {
    const response = await Get('slides', id);
    return response.data;
  }

  static async create(slide) {
    const response = await Post('slides', slide);
    return response.data;
  }

  static async update(slide) {
    const response = await Put('slides', slide.id, slide);
    return response.data;
  }

  static async delete(id) {
    const response = await Delete('slides', id);
    return response.data;
  }
}

export default SlidesService;
