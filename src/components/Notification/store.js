import create from 'zustand';

export default create((set, get) => ({
  notifications: [],

  showNotification: (notification) =>
    set({ notifications: [...get().notifications, notification] }),

  hideNotification: () => set({ notifications: get().notifications.slice(1) }),
}));
