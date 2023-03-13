<template>
  <section class="container chat">
    <div class="chat__wrapper">
      <VChatSidebar @clicked-to-user="chatWithUser" />
      <div class="chat__body">
        <div class="chat__title">Chat</div>
        <div class="chat__subheader">
          <div class="pa-1" v-if="!chatCurrentUser">
            Select the user you want to start a chat with
          </div>
          <div class="chat__subheader-user" v-else>
            <v-avatar size="28" color="indigo lighten-1 mr-1">
              <img :src="setImageProfile" alt="alt" />
            </v-avatar>
            {{ chatCurrentUser.first_name }} {{ chatCurrentUser.second_name }}
          </div>
        </div>
        <v-divider></v-divider>
        <div class="chat__content" ref="chatContent">
          <div class="chat__content-container">
            <div class="chat__content-wrapper">
              <template v-if="!Object.keys(dataChatOptions).length">
                <div class="chat__image">
                  <img src="@/assets/images/chat_image.svg" />
                </div>
              </template>
              <template v-else-if="loader">
                <div class="d-flex justify-center">
                  <VChatLoader />
                </div>
              </template>
              <template v-else>
                <VChatMessage
                  v-for="(dataMessage, index) in dataMessages"
                  :key="`${index}`"
                  :dataMessage="dataMessage"
                />
              </template>
            </div>
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="userTyping && userTyping.id === chatCurrentUser.id"
            class="chat__typing animate"
          >
            <span>{{ userTyping.first_name }} is typing...</span>
          </div>
        </transition>

        <div class="chat__form-container">
          <v-form ref="formChat" class="chat__form" @submit="onSubmit">
            <v-textarea
              @keydown="sendTypingEvent"
              @keydown.enter="onSubmit"
              outlined
              rows="1"
              dense
              max-height="100px"
              v-model="message"
              class="chat__input"
              name="message"
              label="message"
              placeholder="Write message"
            ></v-textarea>
            <v-btn class="chat__button ms-1" type="submit" rounded icon>
              <i class="fa-duotone fa-paper-plane-top"></i>
            </v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VChatMessage from "@/components/UI/VChatMessage.vue";
import VChatSidebar from "@/components/UI/chats/VChatSidebar.vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { mapGetters } from "vuex";
import VChatLoader from "@/components/UI/chats/VChatLoader.vue";

export default {
  components: {
    VChatMessage,
    VChatSidebar,
    VChatLoader,
  },

  data() {
    return {
      message: "",
      toUser: this.$route.params.id,
      typing: false,
      users: [],
      loader: false,
      userTyping: null,
      typingTimer: null,
      chatCurrentUser: null,
      heightTyping: 0,
    };
  },

  mounted() {
    if (window.Echo === undefined) {
      window.Echo = new Echo({
        authEndpoint: "http://localhost:8000/api/broadcasting/auth",
        pusher: Pusher,
        broadcaster: "pusher",
        key: process.env.VUE_APP_PUSHER_APP_KEY,
        cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
        forceTLS: false,
        wsHost: process.env.VUE_APP_PUSHER_HOST,
        wsPort: 6001,
        encrypted: true,
        enabledTransports: ["ws", "wss"],
        auth: {
          headers: {
            Authorization: "Bearer " + this.$store.getters.getAccessToken,
          },
        },
      });
    }
  },

  computed: {
    ...mapGetters({
      dataMessages: "getMessages",
      dataChatOptions: "getChatOptions",
      authUser: "getAuthUser",
    }),

    setImageProfile() {
      if (!this.chatCurrentUser.image_profile) {
        return require("@/assets/photos/defaultGiga.jpg");
      } else
        return `${process.env.VUE_APP_SERVER_URL}${this.chatCurrentUser.image_profile}`;
    },
  },

  methods: {
    chatWithUser(user) {
      this.chatCurrentUser = user;
      this.loader = true;
      this.$store
        .dispatch("fetchCreateSession", { friend_id: user.id })
        .then(() => {
          this.connectChannel(this.dataChatOptions);
        });
    },

    connectChannel(chatOptions) {
      window.Echo.leave(`room.${chatOptions.id}`);

      const channel = window.Echo.join(`room.${chatOptions.id}`);

      channel
        .subscribed(() => {
          console.log("Subscribed!!");
          this.$store.dispatch("fetchAllMessages", chatOptions.id).then(() => {
            this.scrollDown();
          });
          this.loader = false;
        })
        .listen(".room-message", (data) => {
          this.$store.dispatch("pushNewMessage", data.message).then(() => {
            this.scrollDown();
          });
        })
        .listenForWhisper("typing", (user) => {
          this.userTyping = user;
          console.log(this.heightTyping);
          if (this.typingTimer) {
            clearTimeout(this.typingTimer);
          }

          this.typingTimer = setTimeout(() => {
            this.userTyping = null;
          }, 3000);
        });
    },

    onSubmit(event) {
      event.preventDefault();
      const form = this.$refs.formChat.$el;
      const formData = new FormData(form);
      formData.append("room_id", this.dataChatOptions.id);
      formData.append("user", JSON.stringify(this.authUser));
      this.$store.dispatch("fetchSendMessage", formData);
      this.message = "";
    },

    scrollDown() {
      if (this.dataMessages.length) {
        const element = this.$refs.chatContent;
        const height = this.$refs.chatContent.scrollHeight;
        element.scrollTop = height;
      }
    },

    sendTypingEvent() {
      window.Echo.join(`room.${this.dataChatOptions.id}`).whisper(
        "typing",
        this.authUser
      );
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  z-index: 1;
}

.chat {
  &__wrapper {
    background-color: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 0 8px #cd38ff;
    height: 70vh;
    width: 50%;
    margin: 0 48px;
    font-family: "Rubik";
    display: flex;
    position: relative;
  }

  &__title {
    text-align: center;
    font-size: 1.4em;
    font-weight: bold;
    border-bottom: solid 1px rgb(206, 206, 206);
  }

  &__subheader {
    padding: 4px;
    text-align: center;
  }

  &__subheader-user {
    background-color: rgb(206, 206, 206);
    display: inline-block;
    border-radius: 16px;
    padding: 4px;
  }

  &__body {
    padding: 4px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__content {
    overflow-y: auto;
    height: 100%;
  }

  &__content::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__content::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: #6aa5ff;
    padding: 8px 0;
  }

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: 100%;
  }

  &__content-wrapper::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__typing {
    color: rgb(136, 136, 136);
    padding: 8px;

    span {
      animation: blinking 1.5s infinite;
    }

    @keyframes blinking {
      0% {
        opacity: 0.4;
      }

      25% {
        opacity: 0.8;
      }

      50% {
        opacity: 1;
      }

      75% {
        opacity: 0.8;
      }

      100% {
        opacity: 0.4;
      }
    }
  }

  &__form-container {
    background-color: white;
    width: 100%;
    padding: 4px 8px;
  }

  &__image {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    border-radius: 16px;
  }

  &__input::v-deep textarea {
    max-height: 84px;
    overflow: auto;
    margin: 0 4px 4px 0;
  }

  &__input::v-deep textarea::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__input::v-deep textarea::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: #6aa5ff;
    padding: 8px 0;
  }

  &__input::v-deep .v-input__slot {
    margin: 0;
    min-height: 38px;
  }

  &__input::v-deep .v-text-field__details {
    display: none;
  }
}
</style>
