<template>
  <div class="main-body panel">
    <transition name="component-fade" mode="out-in">
      <VLoader v-if="loading && !countPosts?.length" />
      <ul v-else-if="!loading && countPosts?.length">
        <VPost
          v-for="(post, index) in countPosts"
          :key="index"
          :post="post"
          :user="post.user"
        />
      </ul>
      <p v-else>Oops, there are not any posts...</p>
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
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      token: "getAccessToken",
    }),
    countPosts() {
      return this.$store.getters.getAllPosts;
    },
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
        .then(() => {
          this.posts = this.countPosts;
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
