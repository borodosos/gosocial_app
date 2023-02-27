<template>
  <v-menu
    bottom
    ref="menu"
    origin="center center"
    transition="scale-transition"
    :close-on-content-click="false"
    v-model="showMenu"
    rounded="lg"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="ms-auto menu">
        <v-btn
          class="menu__button"
          color="primary"
          v-bind="attrs"
          v-on="on"
          icon
        >
          <i class="fa-duotone fa-trash"></i>
        </v-btn>
      </div>
    </template>

    <v-list dense>
      <v-list-item link @click="confirmDialog = true">
        <v-list-item-title>{{ option.name }}</v-list-item-title>
        <VModalConfirm
          :post="post"
          :confirmDialog="confirmDialog"
          @closeDialog="closeDialogConfirm"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import VModalConfirm from "@/components/UI/VModalConfirm.vue";
export default {
  components: {
    VModalConfirm,
  },
  props: {
    post: Object,
  },
  data() {
    return {
      confirmDialog: false,
      showMenu: false,
      option: { name: "Delete post", value: "delete" },
    };
  },
  methods: {
    closeDialogConfirm() {
      this.confirmDialog = false;
      this.showMenu = false;
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  position: relative;
  z-index: 0;
  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ffffff,
      #ffc1c1,
      #ff7979,
      #ff5c5c,
      #ff2a2a,
      #fa2121,
      #ff0000
    );
    position: absolute;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: 100%;
    height: 100%;
    animation: glowing 2s linear infinite;
    transition: all 0.4s;
    border-radius: 20px;
    opacity: 0;
    @keyframes glowing {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 100% 0;
      }
      100% {
        background-position: 0 0;
      }
    }
  }
  &:hover:before {
    opacity: 0.8;
  }
  &__button {
    &:hover:before {
      background-color: none;
      opacity: 0;
    }
    i {
      font-size: 1.4em;
    }
  }
}
.v-list {
  font-family: "Rubik";
}
</style>
