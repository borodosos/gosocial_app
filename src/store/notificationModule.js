export default {
  state: {
    notification: null,
  },

  actions: {
    addNotification(ctx, payload) {
      return new Promise((resolve) => {
        ctx.commit("updateNotification", payload);
        resolve(payload);
      });
    },
  },

  mutations: {
    updateNotification(state, payload) {
      state.notification = payload;
    },
  },

  getters: {
    getNotification(state) {
      return state.notification;
    },
  },
};
