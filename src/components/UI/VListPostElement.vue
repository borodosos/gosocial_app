<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div
        class="profile__list-post-element"
        @click="showModal = true"
        v-bind="attrs"
        v-on="on"
      >
        <VModalChangePost
          @close-dialog="showModal = false"
          :confirmDialog="showModal"
          :post="post"
        />
        <VPost :post="post" :user="user" />
      </div>
    </template>
    <span>Click to change post</span>
  </v-tooltip>
</template>

<script>
import VModalChangePost from "./VModalChangePost.vue";
import VPost from "./VPost.vue";
export default {
  components: { VModalChangePost, VPost },
  props: {
    post: Object,
    user: Object,
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style scoped lang="scss">
.profile__list-post-element::v-deep .post__header,
.profile__list-post-element::v-deep .post__comments,
.profile__list-post-element::v-deep .menu__button,
.profile__list-post-element::v-deep .v-divider,
.profile__list-post-element::v-deep .post__dialog {
  display: none;
}

.profile__list-post-element::v-deep .post__img {
  width: 200px;
}
</style>
