import Vue from "vue";
import Vuex from "vuex";
import userModule from "./userModule";
import authModule from "./authModule";
import postModule from "./postModule";
import commentModule from "./commentModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    userModule,
    postModule,
    commentModule,
  },
});
