export default {
  state: {
    user: {
      firstName: "Shrek",
      secondName: "Shrekovich",
      email: "user@mail.ru",
      imageProfile: "",
    },
  },

  actions: {},

  mutations: {},

  getters: {
    getUser(state) {
      return state.user;
    },
  },
};
