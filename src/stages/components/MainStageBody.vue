<template>
  <div class="main-body panel">
    <transition name="component-fade" mode="out-in">
      <VLoader v-if="loading" />
      <ul v-else>
        <VPost v-for="(post, index) in posts" :key="index" :post="post" />
      </ul>
    </transition>
  </div>
</template>

<script>
import VPost from "@/components/UI/VPost.vue";
import VLoader from "@/components/UI/VLoader.vue";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { VPost, VLoader },
  data() {
    return {
      posts: [],
      loading: false,
    };
  },

  created() {
    this.loading = true;
    this.$store
      .dispatch("fetchAllPosts")
      .then(() => {
        this.posts = this.$store.getters.getAllPosts;
        console.log(this.posts);
      })
      .catch((error) => {
        this.$toast.add({
          severity: "error",
          summary: "Login",
          detail: error,
          group: "bl",
          life: 3000,
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.main-body {
  margin-top: 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
}
</style>
