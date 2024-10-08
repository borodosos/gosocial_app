import {
  createPost,
  deletePost,
  getAllPosts,
  searchPosts,
  updatePost,
} from "@/http/postApi";

export default {
  state: {
    posts: [],
    lengthPosts: 0,
    keywords: "",
    filter: "",
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
      return new Promise((resolve, reject) => {
        searchPosts(payload)
          .then((res) => {
            if (res.posts) {
              ctx.commit("updatePosts", res.posts.data);
              ctx.commit("updateLengthPosts", res.posts.last_page);
              ctx.commit("updateKeywords", res.keywords);
              ctx.commit("updateFilter", res.filter);
            } else {
              ctx.commit("updatePosts", res.data);
              ctx.commit("updateLengthPosts", res.last_page);
              ctx.commit("updateKeywords", "");
              ctx.commit("updateFilter", "All");
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
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

    fetchUpdatePost(ctx, payload) {
      return new Promise((resolve, reject) => {
        updatePost(payload.postId, payload.formData)
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

    fetchDeletePost(ctx, payload) {
      return new Promise((resolve, reject) => {
        deletePost(payload)
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
    updateKeywords(state, keywords) {
      state.keywords = keywords;
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
  },

  getters: {
    getAllPosts(state) {
      return state.posts;
    },
    getLengthPosts(state) {
      return state.lengthPosts;
    },
    getKeywords(state) {
      return state.keywords;
    },
    getFilter(state) {
      return state.filter;
    },
  },
};
