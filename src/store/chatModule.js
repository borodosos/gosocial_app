import { createSession } from "@/http/chatApi";
import { getAllMessages, sendMessage } from "../http/messageApi";

export default {
  state: {
    messages: [],
    chatOptions: {},
  },

  actions: {
    fetchAllMessages(ctx, payload) {
      return new Promise((resolve, reject) => {
        getAllMessages(payload)
          .then((value) => {
            ctx.commit("updateAllMessages", value);
            resolve(value);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

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
    updateAllMessages(state, messages) {
      state.messages = messages;
    },

    pushMessage(state, message) {
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
