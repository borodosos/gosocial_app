<template>
  <li class="post" ref="post">
    <div class="post__wrapper">
      <div class="post__header">
        <v-avatar size="50" color="purple darken-1" @click="routeToUser">
          <img :src="setImageProfile" alt="alt" />
        </v-avatar>
        <div class="post__info">
          <div class="post__user-info">
            <div class="post__user-name" @click="routeToUser">
              <VPopoverMenuUser :user="user" />
            </div>
            <span v-if="user.role === 'moderator'" class="post__user-role"
              >Boss of this GYM</span
            >
          </div>
          <div class="post__data">{{ parseDate }}</div>
        </div>
        <VModerButtonSettings
          v-if="
            $store.getters.getAuthUser.role === 'moderator' &&
            !($store.getters.getAuthUser.id === user.id)
          "
          :post="post"
        />
        <VButtonSettings
          v-else-if="$store.getters.getAuthUser.id === user.id"
          :post="post"
        />
      </div>
      <div class="post__body">
        <div class="post__title">
          <VHighlightedText v-if="storeFilter === 'All'" :text="post.title" />
          <span v-else> {{ post.title }}</span>
        </div>
        <div class="post__text">
          <VHighlightedText v-if="storeFilter === 'All'" :text="post.text" />
          <span v-else> {{ post.text }} </span>
        </div>
        <div class="post__img">
          <v-img :src="setImage" max-height="400" max-width="500" contain />
        </div>
        <div class="post__tags">
          <v-chip
            v-for="(tag, index) in post.tags"
            :key="`${tag}-${index}`"
            class="mr-2"
            color="indigo lighten-1"
            outlined
            small
          >
            <v-icon left>fa-tag</v-icon>
            <VHighlightedText
              v-if="storeFilter === 'Tags' || 'All'"
              :text="tag.tag_text"
            />
            <span v-else> {{ tag.tag_text }} </span>
          </v-chip>
        </div>
        <v-divider class="ma-2"></v-divider>
        <div class="post__comments">
          <div class="post__comments-container">
            <VPostComments
              class="post__comment"
              v-for="(comment, index) in post.comments"
              :key="index"
              :comment="comment"
              :post="post"
            />
          </div>
          <div class="post__comments-form-container">
            <v-form ref="form" class="comments__form" @submit="onSubmit">
              <v-textarea
                @keydown.enter="onSubmit"
                outlined
                rows="1"
                dense
                max-height="100px"
                auto-grow
                v-model="commentText"
                class="comments__input"
                name="comment"
                label="Comment"
              ></v-textarea>
              <v-btn
                ref="buttonComment"
                class="comments__button"
                type="submit"
                rounded
                icon
                ><i class="fa-duotone fa-paper-plane-top"></i
              ></v-btn>
            </v-form>
          </div>
        </div>
      </div>
    </div>
    <Toast position="bottom-left" group="bl" />
  </li>
</template>

<script>
import { SERVER_URL } from "@/constants";
import { mapGetters } from "vuex";
import VHighlightedText from "./VHighlightedText.vue";
import VPostComments from "./comments/VPostComments.vue";
import Toast from "primevue/toast";
import VModerButtonSettings from "./VModerButtonSettings.vue";
import VButtonSettings from "./VButtonSettings.vue";
import VPopoverMenuUser from "./VPopoverMenuUser.vue";

export default {
  components: {
    VHighlightedText,
    VPostComments,
    Toast,
    VModerButtonSettings,
    VButtonSettings,
    VPopoverMenuUser,
  },

  props: {
    post: Object,
    user: Object,
  },

  data() {
    return {
      postTags: [],
      loading: false,
      commentText: "",
    };
  },

  methods: {
    routeToUser() {
      this.$router.push("/users/" + this.user.id);
    },

    onSubmit(event) {
      event.preventDefault();
      if (!this.commentText.trim().length) {
        return this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please, write a comment",
          group: "bl",
          life: 1800,
        });
      }

      this.loading = true;
      const form = this.$refs.form.$el;
      const formData = new FormData(form);
      this.$store
        .dispatch("fetchAddComment", {
          formData: formData,
          postId: this.post.id,
        })
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: error,
            group: "bl",
            life: 1800,
          });
        })
        .finally(() => (this.commentText = ""));
    },
  },

  computed: {
    ...mapGetters({
      storeFilter: "getFilter",
    }),

    setImage() {
      return `${SERVER_URL}${this.post.image}`;
    },

    setImageProfile() {
      if (!this.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else return `${SERVER_URL}${this.user.image_profile}`;
    },

    parseDate() {
      const date = new Date(this.post.created_at);
      const myOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return date.toLocaleString("en-US", myOptions);
    },
  },
};
</script>

<style scoped>
.post {
  display: block;
  box-shadow: 0 0 10px 0px #c5c5c5;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
}

.post + .post {
  margin-top: 2em;
}

.post__wrapper {
  padding: 25px;
  border-radius: 10px;
}

.post__header {
  display: flex;
  align-items: center;
  margin-bottom: 2%;
}

.post__header .v-avatar {
  margin-right: 5%;
}

.v-avatar img {
  object-fit: cover;
}

.post__user-info {
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.post__user-role {
  font-weight: normal;
  margin-left: 8px;
  border-radius: 4px;
  padding: 0 4px;
  font-size: 0.8em;
  color: rgb(139, 139, 139);
  background-color: rgb(252, 220, 176);
  cursor: default;
}

.post__data {
  color: #8b8b8b;
  font-size: 0.8em;
}

.post__header .v-btn {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post__header .v-btn i {
  text-indent: 0;
  font-size: 1.1em;
}

.post__title {
  font-weight: bold;
  margin-bottom: 5px;
}

.post__text {
  font-size: 0.9em;
  margin-bottom: 8px;
  word-break: break-all;
}

.post__body {
  display: flex;
  flex-direction: column;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.post__img::v-deep .v-image__image {
  border-radius: 8px;
}

.post__img {
  border-radius: 8px;
  background: linear-gradient(
    0deg,
    rgb(82, 82, 82),
    rgb(161, 161, 161),
    rgb(82, 82, 82)
  );
  background-blend-mode: hard-light;
  position: relative;
  box-shadow: 0 0 11px #cd38ff;
}

.post__img .v-image {
  margin: 0 auto;
}

.post__bottom {
  margin-top: 15px;
}

.post__tags {
  margin-top: 10px;
  display: flex;
}

.post__comments {
  border-radius: 8px;
  padding: 8px;
  margin-top: 12px;
  word-break: break-all;
}

.comments__form {
  display: flex;
  justify-content: space-between;
}

.post__comments-container {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 8px;
}

.post__comments-container::-webkit-scrollbar {
  opacity: 0;
  width: 4px;
}

.post__comments-container::-webkit-scrollbar-thumb {
  display: block;
  border-radius: 10px;
  background-color: #6aa5ff;
}

.post__comments-form-container {
  border-radius: 8px;
  position: relative;
  padding: 8px;
  box-shadow: 0 0 8px #cd38ff;
}

.comments__input {
  display: block;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  margin: 0;
  padding: 0;
}

.comments__input::v-deep .v-text-field__details {
  display: none;
}

.comments__input::v-deep textarea {
  max-height: 150px;
  overflow: auto;
}

.comments__input::v-deep textarea::-webkit-scrollbar {
  opacity: 0;
  width: 4px;
}

.comments__input::v-deep textarea::-webkit-scrollbar-thumb {
  display: block;
  border-radius: 10px;
  background-color: #6aa5ff;
  padding: 8px 0;
}

.post__comment + .post__comment {
  margin-top: 8px;
}

.v-chip {
  cursor: pointer;
}

.v-chip__content .v-icon {
  font-size: 1.5em;
  padding: 5px;
}

.post__likes {
  display: flex;
  align-items: center;
}

.post__likes span {
  margin-left: 15px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
