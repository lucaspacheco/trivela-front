import axios from 'axios';

const api = axios.create({
  baseURL: "http://api.trivelafutebolclube.com.br",
});

export default api;
