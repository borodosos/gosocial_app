/* eslint-disable no-unused-vars */
import { createPost, getAllPosts, searchPosts } from "@/http/postApi";

export default {
  state: {
    posts: [],
    lengthPosts: 0,
  },

  actions: {
    fetchAllPosts(ctx, payload) {
      return new Promise((resolve, reject) => {
        getAllPosts(payload)
          .then((res) => {
            ctx.commit("updatePosts", res.data);
            ctx.commit("updateLengthPosts", res.last_page);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    fetchSearchPosts(ctx, payload) {
      console.log(payload);
      // return new Promise((resolve, reject) => {
      //   searchPosts(payload)
      //     .then((res) => {
      //       ctx.commit("updatePosts", res.data);
      //       ctx.commit("updateLengthPosts", res.last_page);
      //       resolve(res);
      //     })
      //     .catch((err) => {
      //       reject(err);
      //     });
      // });
    },

    fetchCreatePost(ctx, payload) {
      return new Promise((resolve, reject) => {
        createPost(payload)
          .then((res) => {
            ctx.dispatch("fetchAllPosts", 1).then(() => {
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
    updateLengthPosts(state, length) {
      state.lengthPosts = length;
    },
  },

  getters: {
    getAllPosts(state) {
      return state.posts;
    },
    getLengthPosts(state) {
      return state.lengthPosts;
    },
  },
};
