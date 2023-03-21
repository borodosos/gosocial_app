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
        <div class="post__text" ref="post_text-div">
          <VHighlightedText v-if="storeFilter === 'All'" :text="post.text" />
          <span ref="post_text-span" v-else> {{ post.text }} </span>
        </div>
        <button
          class="post__button-show-text"
          v-show="showExpandButton"
          @click="expandText"
        >
          Show text
        </button>

        <div class="post__img">
          <div class="post__img-overlay" @click="dialog = !dialog"></div>
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
    <VModalPost
      class="post__dialog"
      :modalDialog="dialog"
      @toggle-func="toggleDialog"
      :post="post"
    />
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
import VModalPost from "./VModalPost.vue";

export default {
  components: {
    VHighlightedText,
    VPostComments,
    Toast,
    VModerButtonSettings,
    VButtonSettings,
    VPopoverMenuUser,
    VModalPost,
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
      dialog: false,
      showExpandButton: false,
      textDivHeight: `${14.5 * 5 + 16}px`,
    };
  },

  mounted() {
    if (this.$refs["post_text-span"].getClientRects().length > 5) {
      this.showExpandButton = true;
    } else {
      this.showExpandButton = false;
    }
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

    toggleDialog() {
      this.dialog = false;
    },

    expandText() {
      const countRows = this.$refs["post_text-span"].getClientRects().length;
      this.textDivHeight = `${countRows * 21.6}px`;
      this.showExpandButton = false;
    },
  },

  computed: {
    ...mapGetters({
      storeFilter: "getFilter",
    }),

    setImage() {
      const path = this.post.image.replace("public/", "");
      return `${SERVER_URL}${path}`;
    },

    setImageProfile() {
      if (!this.user.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else {
        const path = this.user.image_profile.replace("public/", "");
        return `${SERVER_URL}${path}`;
      }
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
  word-break: break-all;
  max-height: v-bind(textDivHeight);
  overflow-y: hidden;
  transition: all 0.5s ease;
}

.post__button-show-text {
  display: inline;
  width: max-content;
  font-size: 0.9em;
  border-radius: 8px;
  color: #4a92ff;
  transition: all 0.2s ease;
  padding: 4px 8px;
  box-shadow: 0 0 8px #4a92ff;
}

.post__button-show-text:hover {
  background-color: #6aa5ff;
  color: #ffffff;
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
  margin-top: 8px;
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

.post__img-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
  border-radius: 8px;
  cursor: pointer;
  background: url("@/assets/—Pngtree—vector\ open\ icon_3996316.png") no-repeat,
    #8b8b8b;
  background-position: 50% 50%;
  background-size: 50%;
}

.post__img:hover .post__img-overlay {
  opacity: 0.5;
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
