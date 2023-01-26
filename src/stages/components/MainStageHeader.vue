<template>
  <section class="main-header panel">
    <div class="main-header">
      <div class="main-header__search">
        <div class="main-header__search-wrapper">
          <div class="main-header__back-input">
            <InputText
              class="input"
              type="text"
              v-model="postText"
              placeholder="What's on your mind..."
              @focus.native="showBackground"
              @blur="showBackground"
              @click="
                {
                  showTitleInput = !showTitleInput;
                }
              "
            />
          </div>
        </div>
      </div>

      <div class="main-header__content">
        <v-divider />
        <div class="main-header__menu">
          <InputText
            class="main-header__title-input"
            v-show="showTitleInput"
            v-model="postTitle"
            type="text"
            placeholder="Write title..."
          />

          <FormulateInput
            class="main-header__file-input"
            v-show="fileInput"
            type="image"
            label="Post Image"
            validation="mime:image/jpeg,image/jpg,image/png"
            help="Download your image"
          />

          <div class="main-header__menu-buttons">
            <div class="main-header__crumbs">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="button-icon-menu"
                    v-on="on"
                    @click="showFileInput"
                    icon
                  >
                    <i class="fa-duotone fa-image"></i>
                  </v-btn>
                </template>
                <span>Image</span>
              </v-tooltip>

              <Dropdown
                class="custom-select"
                v-model="selectedTag"
                :options="tags"
                placeholder="Tags"
              />
            </div>
            <v-btn class="indigo button-post" rounded>POST</v-btn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

export default {
  components: {
    InputText,
    Dropdown,
  },

  data() {
    return {
      postTitle: "",
      postText: "",
      postTag: null,
      postLikes: 0,
      selectedTag: null,
      expanded: false,
      showback: false,
      myopacity: 0,
      showTitleInput: false,
      fileInput: false,
      files: [],
      tags: [
        "IT",
        "Games",
        "Music",
        "Humor",
        "Film",
        "Sport",
        "Science",
        "Turism",
      ],
    };
  },

  methods: {
    showBackground() {
      if (this.showback !== true) {
        this.showback = true;
        this.myopacity = 0.4;
      } else {
        this.showback = false;
        this.myopacity = 0;
      }
    },

    showFileInput() {
      this.fileInput = !this.fileInput;
    },
  },
};
</script>

<style scoped>
.main-header {
  height: max-content;
}

.main-header__search-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s;
}

.main-header__search-wrapper .v-avatar {
  margin-right: 15px;
}

.v-divider {
  margin: 10px 0 10px;
}

.main-header__back-input {
  position: relative;
  z-index: 0;
  border-radius: 20px;
  width: 100%;
}

.p-inputtext {
  border-radius: 20px;
  width: 100%;
  color: black;
  padding: 10px;
  background: none;
}

.main-header__back-input:before {
  content: "";
  background: linear-gradient(
    45deg,
    #13dcff,
    #8fff72,
    #d893ff,
    #0fe4f3,
    #12f1cc,
    #0f35ef,
    #7c13ef,
    #ef13bf,
    #de0d0d
  );
  position: absolute;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: 100%;
  height: 100%;
  opacity: v-bind(myopacity);
  animation: glowing 5s linear infinite;
  transition: all 0.4s;
  border-radius: 20px;
}

.main-header__back-input:hover:before {
  opacity: 0.4;
}

.p-inputtext:enabled:hover {
  border: 1px solid rgba(0, 0, 0, 0);
}

.main-header__title-input {
  margin-bottom: 10px;
}

.main-header__file-input {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

.main-header__content {
}

.main-header__menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-header__menu-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.main-header__crumbs {
  display: flex;
  width: 25%;
  justify-content: space-between;
}

.button-icon-menu {
  padding: 0 8px;
  transition: all 0.1s;
}

.button-icon-menu:hover {
  transform: scale(1.1);
  box-shadow: 0px 5px 12px 0px rgb(180, 180, 180);
}

.button-icon-menu:active {
  box-shadow: 0px 5px 12px 0px rgb(111, 219, 252);
}

.button-icon-menu i {
  font-size: 1.4em;
}

.button-icon-menu span {
  font-weight: bold;
  font-size: 0.8em;
  color: #8b8b8b;
  margin-left: 5%;
}

.button-post {
  background: linear-gradient(0deg, rgb(158, 160, 255), rgb(253, 239, 239));
  color: rgb(70, 70, 70);
}

.button-post:hover {
  transform: scale(1.1);
}

.button-tags:active {
  box-shadow: 0 0 5px rgb(111, 219, 252);
}

.button-post:active {
  box-shadow: 0 0 5px rgb(111, 219, 252);
  transform: scale(0.9);
}
</style>
