import { Post, Put, Get, Delete } from './privateApiService';
const path = process.env.REACT_APP_ACTIVITIES_ENDPOINT;
class ActivitiesService {
  static async create(activity) {
    const response = await Post(path, { ...activity });
    return response;
  }

  static async update(activity) {
    const response = await Put(path, activity.id, { ...activity });
    return response;
  }

  static async remove(id) {
    const response = await Delete(path, id);
    return response;
  }

  static async getActivities(id) {
    const response = await Get(path, id ? id : null);
    return response;
  }
}

export default ActivitiesService;
