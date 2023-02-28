<template>
  <div class="container-main">
    <UserStage class="stage" />
    <MainStage class="stage" />
  </div>
</template>

<script>
import MainStage from "@/stages/MainStage.vue";
import UserStage from "@/stages/UserStage.vue";

export default {
  components: {
    MainStage,
    UserStage,
  },
};
</script>

<style>
.container-main {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  column-gap: 4%;
  font-family: "Rubik", sans-serif;
  width: 75%;
  margin: 1.8em auto;
}

.panel {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 10px 0 rgb(107, 107, 107);
}

.stage {
  position: relative;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
