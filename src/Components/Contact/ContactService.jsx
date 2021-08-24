import { Delete, Get, Post, Put } from '../../Services/privateApiService';
const path = process.env.REACT_APP_CONTACT_ENDPOINT;

class ContactService {
  static async getAll() {
    const response = await Get(path);
    return response.data;
  }

  static async getById(id) {
    const response = await Get(path, id);
    return response.data;
  }

  static async create(contact) {
    contact.phone = String(contact.phone);
    const response = await Post(path, contact);
    return response.data;
  }

  static async update(contact) {
    contact.phone = String(contact.phone);
    const response = await Put(path, contact.id, contact);
    return response.data;
  }

  static async delete(id) {
    const response = await Delete(path, id);
    return response.data;
  }
}

export default ContactService;
