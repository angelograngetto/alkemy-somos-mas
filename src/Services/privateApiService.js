import axios from 'axios';

const config = {
  headers: {
    Group: 1, //Aqui va el ID del equipo!!
  },
};

export const getToken = () => {
  const headerAuthorization = '';
  const token = localStorage.getItem('token') || '';

  if (token !== '') {
    headerAuthorization = 'Bearer ' + token;
  }

  return {
    headerAuthorization: headerAuthorization,
  };
};

const Get = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default Get;
