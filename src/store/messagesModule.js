import { sendMessage } from "../http/messageApi";

export default {
  state: {
    messages: [],
  },

  actions: {
    fetchSendMessage(ctx, payload) {
      return new Promise((resolve, reject) => {
        sendMessage(payload)
          .then((value) => {
            resolve(value);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },

  mutations: {
    updateMessages(state, message) {
      state.messages.push(message);
    },
  },

  getters: {
    getMessages(state) {
      return state.messages;
    },
  },
};
