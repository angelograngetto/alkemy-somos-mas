import { Delete, Get, Post, Put } from './privateApiService';
const path = process.env.REACT_APP_MEMBERS_ENDPOINT;
class MembersService {
  static async getAll() {
    const response = await Get(path);
    return response.data;
  }

  static async getById(id) {
    const response = await Get(path, id);
    return response.data;
  }

  static async create(member) {
    const response = await Post(path, member);
    return response.data;
  }

  static async update(member) {
    const response = await Put(path, member.id, member);
    return response.data;
  }

  static async delete(id) {
    const response = await Delete(path, id);
    return response.data;
  }
}

export default MembersService;
