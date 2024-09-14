const useFileSlice = (set, get) => ({
  accessUser: false,
  accessAdmin: false,

  logoutUser: () => {
    set({ accessUser: false });
  },

  accessCheck: () => {
    const csrfToken = document.cookie.match(/csrftoken=([^;]*)/);

    if (csrfToken) {
      set({ accessUser: true });
    } else {
      set({ accessUser: false });
      console.log("Доступ запрещен");
    }
  },
  accsessCheckAdmin: (flag) => {
    set({ accessAdmin: flag });
  },
});

export default useFileSlice;
