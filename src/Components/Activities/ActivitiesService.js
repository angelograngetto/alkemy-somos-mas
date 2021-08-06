import { Post, Put, Get, Delete } from '../../Services/privateApiService';
class ActivitiesService {
  static async create(activity) {
    const response = await Post('/activities', { ...activity });
    return response;
  }

  static async update(activity) {
    const response = await Put('/activities', activity.id, { ...activity });
    return response;
  }

  static async remove(id) {
    const response = await Delete('/activities', id);
    return response;
  }

  static async getActivities(id) {
    const response = await Get('/activities', id ? id : null);
    return response;
  }
}

export default ActivitiesService;
