import create from "zustand";
import { deleteCookie, deleteCookies, getCookie, setCookie } from "utils/helpers";

export default create((set) => ({
    userInfo: {
      token: getCookie("trivela_token")
    },
    deviceInfo: {
      token: getCookie("trivela_dtoken")
    },
    isAuthenticated: false,
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setCookie("trivela_token", userInfo.token);
    },
    login: (data) => {
      set({ userInfo: data, isAuthenticated: true });
      deleteCookie("trivela_dtoken");
      setCookie("trivela_token", data.auth.token);
    },
    loginDevice: (data) => {
      set({ device: data, isAuthenticated: true });
      setCookie("trivela_dtoken", data.auth.token);
    },
    logout: () => {
      set({ userInfo: {}, isAuthenticated: false });
      deleteCookies();
    }
  })
);
