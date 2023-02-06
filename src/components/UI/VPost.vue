<template>
  <li class="post">
    <div class="post__wrapper">
      <div class="post__header">
        <v-avatar size="50" color="red">
          <!-- <img
            v-if="user.image_profile !== '0'"
            src="@/assets/photos/somebody.jpeg"
            alt="alt"
          />
          <img v-else src="@/assets/photos/defaultGiga.jpg" alt="alt" /> -->
          <img src="@/assets/photos/defaultGiga.jpg" alt="alt" />
        </v-avatar>
        <div class="post__user-info">
          <div class="post__user-name">
            {{ user.first_name }} {{ user.second_name }}
          </div>
          <div class="post__data">{{ parseDate() }}</div>
        </div>
      </div>
      <div class="post__body">
        <div class="post__title">{{ post.title }}</div>
        <div class="post__text">
          {{ post.text }}
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
            {{ tag.tag_text }}
          </v-chip>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
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
      imageLoad: true,
      imageSrc: `${process.env.VUE_APP_SERVER_URL}${this.post.image}`,
    };
  },

  methods: {
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

  computed: {
    setImage() {
      return `${process.env.VUE_APP_SERVER_URL}${this.post.image}`;
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
}

.post__user-name {
  font-weight: bold;
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

.v-chip {
  cursor: pointer;
}

.v-chip__content .v-icon {
  font-size: 1.5em;
  padding: 5px;
}

.post__buttons {
}

.post__likes {
  display: flex;
  align-items: center;
}

.post__likes span {
  margin-left: 15px;
}
</style>
