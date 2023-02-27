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
};
</script>

<style scoped>
.main {
  height: max-content;
  min-width: 505px;
}
</style>
