<template>
  <li class="post" ref="post">
    <div class="post__wrapper">
      <div class="post__header">
        <v-avatar size="50" color="purple darken-1" @click="routeToUser">
          <img :src="setImageProfile" alt="alt" />
        </v-avatar>
        <div class="post__user-info">
          <div class="post__user-name" @click="routeToUser">
            <VHighlightedText
              v-if="storeFilter === 'Authors' || 'All'"
              :text="`${user.first_name} ${user.second_name}`"
            />
            <span v-else> {{ user.first_name }} {{ user.second_name }} </span>
          </div>
          <div class="post__data">{{ parseDate }}</div>
        </div>
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
        <div class="post__comments">
          <div class="post__comments-container">
            <VPostComments
              class="post__comment"
              v-for="(item, index) in [1, 2, 3, 4]"
              :key="index"
              :user="user"
              :post="post"
            />
          </div>
          <div class="post__comments-form-container">
            <v-form ref="form" class="comments__form">
              <InputText
                class="comments__input"
                name="comment"
                label="Comment"
                placeholder="Write comment..."
              ></InputText>
              <v-btn class="default-button comments__button" rounded
                >Comment</v-btn
              >
            </v-form>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { SERVER_URL } from "@/constants";
import { mapGetters } from "vuex";
import VHighlightedText from "./VHighlightedText.vue";
import VPostComments from "./comments/VPostComments.vue";
import InputText from "primevue/inputtext/InputText";

export default {
  components: {
    VHighlightedText,
    VPostComments,
    InputText,
  },

  props: {
    post: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },

  data() {
    return {
      postTags: [],
    };
  },

  methods: {
    routeToUser() {
      this.$router.push("/users/" + this.user.id);
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
        weekday: "long",
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

.post__user-name {
  font-weight: bold;
  cursor: pointer;
}

.post__data {
  color: #8b8b8b;
  font-size: 0.9em;
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
  margin-bottom: 1%;
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
}

.post__img {
  border-radius: 10px;
  background: linear-gradient(
    0deg,
    rgb(82, 82, 82),
    rgb(161, 161, 161),
    rgb(82, 82, 82)
  );
  background-blend-mode: hard-light;
  position: relative;
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
  border-radius: 4px;
  box-shadow: inset 0 0 8px #b9b9b9;
  padding: 8px;
  margin-top: 12px;
}

.comments__form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__comments-container {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
}

.post__comments-container::-webkit-scrollbar {
  opacity: 0;
  width: 4px;
}

.post__comments-container::-webkit-scrollbar-thumb {
  display: block;
  border-radius: 10px;
  background-color: black;
}

.post__comments-form-container {
  padding: 12px 16px 8px;
  background-color: #e5e5e5;
  margin-right: 8px;
}

.post__comment + .post__comment {
  margin-top: 8px;
}

.comments__input {
  width: 75%;
  border-radius: 16px;
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
