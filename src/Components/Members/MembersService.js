import { Delete, Get, Post, Put } from '../../Services/privateApiService';

class MembersService {
  static async getAll() {
    const response = await Get('members');
    return response.data;
  }

  static async getById(id) {
    const response = await Get('members', id);
    return response.data;
  }

  static async create(member) {
    const response = await Post('members', member);
    return response.data;
  }

  static async update(member) {
    const response = await Put('members', member.id, member);
    return response.data;
  }

  static async delete(id) {
    const response = await Delete('members', id);
    return response.data;
  }
}

export default MembersService;
