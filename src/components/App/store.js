import create from 'zustand';
import { getCookie, setCookie } from 'utils/helpers';

export default create((set) => ({
  userInfo: {
    token: getCookie('trivela_token'),
  },
  isAuthenticated: false,

  setUserInfo: (userInfo) => {
    set({ userInfo });
    setCookie('trivela_token', userInfo.token);
  },

  login: (userInfo) => {
    set({ userInfo, isAuthenticated: true });
    setCookie('trivela_token', userInfo.token);
  },
  logout: () => {
    set({ userInfo: {}, isAuthenticated: false });
    setCookie('trivela_token', null);
  },
}));
