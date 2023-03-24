<template>
  <div class="container-main">
    <UserStage class="stage" />
    <MainStage class="stage" />
    <FriendsStage class="stage" />
  </div>
</template>

<script>
import FriendsStage from "@/stages/FriendsStage.vue";
import MainStage from "@/stages/MainStage.vue";
import UserStage from "@/stages/UserStage.vue";

export default {
  components: {
    MainStage,
    UserStage,
    FriendsStage,
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
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 0 12px 0 rgb(107, 107, 107);
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
