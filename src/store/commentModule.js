import { addComment, updateComment, deleteComment } from "@/http/commentApi";

export default {
  actions: {
    fetchAddComment(ctx, payload) {
      return new Promise((resolve, reject) => {
        addComment(payload)
          .then((res) => {
            console.log(res);
            ctx.dispatch("fetchAllPosts", 1).then(() => {
              resolve(res);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchUpdateComment(ctx, payload) {
      return new Promise((resolve, reject) => {
        updateComment(payload)
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

    fetchDeleteComment(ctx, payload) {
      return new Promise((resolve, reject) => {
        deleteComment(payload)
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
};
