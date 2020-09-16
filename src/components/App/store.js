import create from 'zustand';
import { getCookie, setCookie } from 'utils/helpers';

export default create((set) => ({
  token: getCookie('trivela_token'),

  setToken: (token) => {
    set({ token });
    setCookie('trivela_token', token);
  },
}));
