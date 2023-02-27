<template>
  <v-dialog
    :value="confirmDialog"
    @click:outside="$emit('closeDialog')"
    persistent
    max-width="290"
  >
    <v-card class="card-confirm">
      <div class="card-confirm__text">
        Are you sure you want to delete the
        <strong
          >{{ post.user.first_name }} {{ post.user.second_name }}'s</strong
        >
        post?
      </div>
      <div class="card-confirm__menu">
        <v-spacer></v-spacer>
        <v-btn
          class="default-button card-confirm__button disagree"
          rounded
          @click="$emit('closeDialog')"
        >
          Disagree
        </v-btn>
        <v-btn
          class="default-button card-confirm__button agree"
          rounded
          @click="deletePost"
        >
          Agree
        </v-btn>
      </div>
    </v-card>
    <Toast position="bottom-left" group="bl" />
  </v-dialog>
</template>

<script>
import Toast from "primevue/toast/Toast";

export default {
  props: {
    confirmDialog: Boolean,
    post: Object,
  },
  methods: {
    deletePost() {
      console.log(this.post);
      this.$emit("closeDialog");
      this.$store.dispatch("fetchDeletePost", this.post.id).then((value) => {
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: value,
          group: "bl",
          life: 1800,
        });
      });
    },
  },
  components: { Toast },
};
</script>

<style scoped lang="scss">
.card-confirm {
  border-radius: 8px;
  padding: 12px;
  &__text {
  }
  &__menu {
    padding-top: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__button {
  }
  .disagree {
    background: linear-gradient(0deg, rgb(255, 74, 74), rgb(255, 136, 136));
  }
  .agree {
    margin-left: 8px;
    background: linear-gradient(0deg, rgb(125, 255, 74), rgb(136, 255, 146));
  }
}
</style>
