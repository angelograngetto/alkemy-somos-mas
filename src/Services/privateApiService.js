/* eslint-disable no-console */
import axiosInstance from './axiosInstance';

const config = {
  headers: {
    Group: 54, //Aqui va el ID del equipo!!
  },
};

export const getToken = () => {
  let headerAuthorization = '';
  const token = localStorage.getItem('token') || '';

  if (token !== '') {
    headerAuthorization = 'Bearer ' + token;
  }

  return {
    headerAuthorization: headerAuthorization,
  };
};

export const Get = (path, id) => {
  const token = getToken();
  axiosInstance
    .get(`${path}/${id ? id : ''}`, {
      headers: { Authorization: token.headerAuthorization },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const Put = (endpoint, id, obj) => {
  const token = getToken();
  axiosInstance
    .put(`${endpoint}/${id}`, obj, {
      headers: { Authorization: token.headerAuthorization },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
export const Delete = async (url, id) => {
  const token = getToken();
  try {
    const response = await instance.delete(`${url}/${id}`, {
      headers: {
        Authorization: token.headerAuthorization,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export default Get;
export const Post = async (url, body) => {
  try {
    const token = await getToken();
    await axiosInstance.post(`${url}`, body, {
      headers: { Authorization: token.headerAuthorization },
    });
  } catch (error) {
    console.log(error);
  }
};
