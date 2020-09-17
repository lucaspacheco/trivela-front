import create from 'zustand';
import { getCookie, setCookie } from 'utils/helpers';

export default create((set) => ({
  userInfo: {
    token: getCookie('trivela_token'),
  },

  setUserInfo: (userInfo) => {
    set({ userInfo });
    setCookie('trivela_token', userInfo.token);
  },
}));
