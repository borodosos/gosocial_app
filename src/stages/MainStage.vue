<template>
  <section class="main">
    <MainStageHeader />
    <MainStageBody />
  </section>
</template>

<script>
import MainStageBody from "./components/MainStageBody.vue";
import MainStageHeader from "./components/MainStageHeader.vue";

export default {
  components: {
    MainStageBody,
    MainStageHeader,
  },

  data() {
    return {
      loading: false,
    };
  },

  created() {
    this.$store.dispatch("fetchAllPosts").then(() => {
      console.log("postsStore: ", this.$store.getters.getAllPosts);
    });
  },
};
</script>

<style scoped>
.main {
  height: max-content;
}
</style>
