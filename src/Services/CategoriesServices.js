import { Delete, Get, Post, Put } from '../Services/privateApiService';

export default class CategoriesServices {
  static async getAll() {
    const response = await Get('categories');
    return response.data.data;
  }
  static async getById(id) {
    const response = await Get('categories', id);
    return response.data;
  }
  static async create(categorie) {
    const response = await Post('categories', categorie);
    return response.data;
  }
  static async update(categorie, id) {
    const response = await Put('categories', id, categorie);
    return response.data;
  }
  static async delete(id) {
    const response = await Delete('categories', id);
    return response.data;
  }
}
