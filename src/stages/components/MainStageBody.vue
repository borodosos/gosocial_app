<template>
  <div class="main-body panel">
    <transition name="component-fade" mode="out-in">
      <VLoader v-if="loading && !posts.length" />
      <ul v-else>
        <VPost
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          :user="post.user"
        />
      </ul>
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

  methods: {
    async fetchPosts() {
      this.loading = true;
      this.$store
        .dispatch("fetchAllPosts")
        .then((value) => {
          console.log(value);
          this.posts = value;
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

  mounted() {
    this.fetchPosts();
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
