/* eslint-disable no-console */
import axiosInstance from './axiosInstance';

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

export const Get = async (path, id) => {
  try {
    const token = getToken();
    const resp = await axiosInstance.get(`${path}/${id ? id : ''}`, {
      headers: {
        Authorization: token.headerAuthorization,
      },
    });
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

export const Put = async (endpoint, id, obj) => {
  try {
    const token = getToken();
    const resp = await axiosInstance.put(`${endpoint}/${id}`, obj, {
      headers: {
        Authorization: token.headerAuthorization,
      },
    });
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};

export const Delete = async (url, id) => {
  try {
    const token = getToken();
    const response = await axiosInstance.delete(`${url}/${id}`, {
      headers: {
        Authorization: token.headerAuthorization,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const Post = async (url, body) => {
  try {
    const token = getToken();
    const response = await axiosInstance.post(`${url}`, body, {
      headers: {
        Authorization: token.headerAuthorization,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
