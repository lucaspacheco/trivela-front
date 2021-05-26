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
    setUserInfo: (data) => {
      set({ userInfo: data.user });
      setCookie("trivela_token", data.auth.token);
    },
    login: (data) => {
      set({ userInfo: data.user, isAuthenticated: true });
      deleteCookie("trivela_dtoken");
      setCookie("trivela_token", data.auth.token);
    },
    loginDevice: (data) => {
      set({ deviceInfo: data.device, isAuthenticated: true });
      setCookie("trivela_dtoken", data.auth.token);
    },
    logout: () => {
      set({ userInfo: {}, device: {}, isAuthenticated: false });
      deleteCookies();
    }
  })
);
