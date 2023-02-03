import { getAllPosts } from "@/http/postApi";

export default {
  state: {
    posts: null,
  },

  actions: {
    pushPost(ctx, payload) {
      console.log(payload);
      ctx.commit("updatePost", payload);
    },

    async fetchAllPosts(ctx) {
      return new Promise((resolve, reject) => {
        getAllPosts()
          .then((res) => {
            ctx.commit("updatePosts", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },

  mutations: {
    updatePosts(state, posts) {
      state.posts = posts;
    },
  },

  getters: {
    getAllPosts(state) {
      return state.posts;
    },
  },
};
