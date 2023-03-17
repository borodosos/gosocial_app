export default {
  state: {
    echo: null,
  },

  actions: {
    createEcho(ctx, payload) {
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
  },

  getters: {
    getNotification(state) {
      return state.notification;
    },
  },
};
