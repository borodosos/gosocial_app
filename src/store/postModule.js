import { createPost, getAllPosts } from "@/http/postApi";

export default {
  state: {
    posts: null,
  },

  actions: {
    async fetchAllPosts(ctx) {
      return new Promise((resolve, reject) => {
        getAllPosts()
          .then((res) => {
            res.reverse();
            ctx.commit("updatePosts", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async fetchCreatePost(ctx, payload) {
      return new Promise((resolve, reject) => {
        createPost(payload)
          .then((res) => {
            ctx.dispatch("fetchAllPosts").then(() => {
              resolve(res);
            });
          })
          .catch((error) => {
            reject(error);
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
