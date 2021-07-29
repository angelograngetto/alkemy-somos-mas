import axios from 'axios';

const activitiesURL = 'http://ongapi.alkemy.org/api/activities';

class ActivitiesService {
  static async create(activity) {
    const response = await axios.post(
      activitiesURL,
      { ...activity },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  static async update(activity) {
    const response = await axios.put(
      `${activitiesURL}/${activity.id}`,
      { ...activity },
      {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    console.log(response);
  }
}

export default ActivitiesService;
