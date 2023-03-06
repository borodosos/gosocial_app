import { createSession } from "@/http/chatApi";
import { sendMessage } from "../http/messageApi";

export default {
  state: {
    messages: [],
    chatOptions: {},
  },

  actions: {
    fetchCreateSession(ctx, payload) {
      return new Promise((resolve, reject) => {
        createSession(payload)
          .then((value) => {
            ctx.commit("updateChatOptions", value);
            resolve(value);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

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

    updateChatOptions(state, payload) {
      state.chatOptions = payload;
    },
  },

  getters: {
    getMessages(state) {
      return state.messages;
    },

    getChatOptions(state) {
      return state.chatOptions;
    },
  },
};
