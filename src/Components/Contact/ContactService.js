import { Delete, Get, Post, Put } from '../../Services/privateApiService';

class ContactService {
  static async getAll() {
    const response = await Get('contacts');
    return response.data;
  }

  static async getById(id) {
    const response = await Get('contacts', id);
    return response.data;
  }

  static async create(contact) {
    contact.phone = String(contact.phone);
    const response = await Post('contacts', contact);
    return response.data;
  }

  static async update(contact) {
    contact.phone = String(contact.phone);
    const response = await Put('contacts', contact.id, contact);
    return response.data;
  }

  static async delete(id) {
    const response = await Delete('contacts', id);
    return response.data;
  }
}

export default ContactService;
