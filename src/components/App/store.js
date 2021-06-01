import create from "zustand";
import { deleteCookie, deleteCookies, getCookie, setCookie } from "utils/helpers";

export default create((set) => ({
    userInfo: {},
    token: getCookie("trivela_token"),
    isAuthenticated: false,
    setUserInfo: (user, token = false) => {
      set({ userInfo: user, token });
      if (token) setCookie("trivela_token", token);
    },
    login: (token, user = false) => {
      set({ userInfo: user || {}, token, isAuthenticated: true });
      setCookie("trivela_token", token);
    },
    logout: () => {
      set({ userInfo: {}, token: null, isAuthenticated: false });
      deleteCookies();
    }
  })
);
