export default {
  state: {
    messages: [],
  },

  actions: {
    SOCKET_newMessage(ctx, data) {
      console.log("Received message", data);
    },
  },

  mutations: {},

  getters: {},
};
