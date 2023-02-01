<template>
  <div class="main-body panel">
    <transition name="component-fade" mode="out-in">
      <VLoader v-if="loading" />
      <ul v-else-if="!loading && posts.length">
        <VPost v-for="(post, index) in posts" :key="index" :post="post" />
      </ul>
      <div v-else>
        <p>Please, reload page!</p>
      </div>
    </transition>
  </div>
</template>

<script>
import VPost from "@/components/UI/VPost.vue";
import VLoader from "@/components/UI/VLoader.vue";
import { mapGetters } from "vuex";

export default {
  components: { VPost, VLoader },
  data() {
    return {
      posts: [],
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      token: "getAccessToken",
    }),
  },

  watch: {
    token: function () {
      if (this.token) {
        this.fetchPosts();
      }
    },
  },

  created() {
    this.fetchPosts();
  },

  methods: {
    async fetchPosts() {
      this.loading = true;
      this.$store
        .dispatch("fetchAllPosts")
        .then(() => {
          this.posts = this.$store.getters.getAllPosts;
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
