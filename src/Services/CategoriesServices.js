import { Delete, Get, Post, Put } from '../Services/privateApiService';
const path = process.env.REACT_APP_CATEGORIES_ENDPOINT;
export default class CategoriesServices {
  static async getAll() {
    const response = await Get(path);
    return response.data.data;
  }
  static async getById(id) {
    const response = await Get(path, id);
    return response.data;
  }
  static async create(categorie) {
    const response = await Post(path, categorie);
    return response.data;
  }
  static async update(categorie, id) {
    const response = await Put(path, id, categorie);
    return response.data;
  }
  static async delete(id) {
    const response = await Delete(path, id);
    return response.data;
  }
  static async search(value) {
    const response = await Get(`${path}?search=${value}`);
    return response.data.data;
  }
}
