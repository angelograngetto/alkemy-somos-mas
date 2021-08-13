import { Get, Post } from './privateApiService';
const path = process.env.REACT_APP_ORGANIZATION_ENDPOINT;
class OrganizationService {
  static async get() {
    const response = await Get(path);
    return response.data;
  }

  static async edit(organization) {
    const response = await Post(path, organization);
    return response.data;
  }
}

export default OrganizationService;
