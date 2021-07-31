import axios from 'axios';

//SUBMIT OR EDIT FUNCTION DEPENDING ON EXISTENCE OF NEWS

export const updateNews = async (news, data) => {
  try {
    await axios.put(`http://ongapi.alkemy.org/api/news/${news.id}`, data);
  } catch (err) {
    alert(err.response);
  }
};

export const postNews = async (data) => {
  try {
    await axios.post('http://ongapi.alkemy.org/api/news', data);
  } catch (err) {
    alert(err.response);
  }
};
