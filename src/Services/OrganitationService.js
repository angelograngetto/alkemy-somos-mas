import { Get, Post } from './privateApiService';

class OrganizationService {
  static async get() {
    const response = await Get('organization');
    return response.data;
  }

  static async edit(organization) {
    const response = await Post('organization', organization);
    return response.data;
  }
}

export default OrganizationService;
