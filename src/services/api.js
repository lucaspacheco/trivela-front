import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.response.use(undefined, (error) => {
  // eslint-disable-next-line no-param-reassign
  error.originalMessage = error.message;
  Object.defineProperty(error, 'message', {
    get() {
      if (!error.response) {
        return error.originalMessage;
      }
      return error.response.data.errorMessage || 'Ocorreu um erro inesperado.';
    },
  });
  return Promise.reject(error);
});

export default api;
