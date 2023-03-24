export default {
  state: {
    notification: {},
    timer: null,
  },

  actions: {
    addNotification(ctx, payload) {
      return new Promise((resolve) => {
        ctx.commit("updateNotification", payload);

        if (ctx.state.timer) {
          resolve(payload);
        }
        ctx.state.timer = setTimeout(() => {
          ctx.commit("removeNotification");
          ctx.state.time = null;
        }, 3000);
        resolve(payload);
      });
    },
  },

  mutations: {
    updateNotification(state, payload) {
      state.notification = payload;
    },

    removeNotification(state) {
      state.notification = {};
    },
  },

  getters: {
    getNotification(state) {
      return state.notification;
    },
  },
};
