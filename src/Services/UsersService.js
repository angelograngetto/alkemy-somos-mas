import { Get, Put, Post, Delete } from './privateApiService';

class UsersService {
  static async get() {
    try {
      const resp = await Get('/users');
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getById(id) {
    try {
      const resp = await Get('/users', id);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async create(user) {
    try {
      const resp = await Post('/users', user);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async update(id, updatedUser) {
    try {
      const resp = await Put('/users', id, updatedUser);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async delete(id) {
    try {
      const resp = await Delete('/users', id);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async search(keys) {
    try {
      const resp = await Get(`/users?search=${keys}`);
      return resp;
    } catch {
      throw new Error(error);
    }
  }
  static async filter(keys, role) {
    try {
      const resp = await Get(`/users?search=${keys}&role=${role}`);
      return resp;
    } catch {
      throw new Error(error);
    }
  }
}

export default UsersService;
