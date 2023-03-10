<template>
  <section class="container chat">
    <div class="chat__wrapper">
      <VChatSidebar @clicked-to-user="chatWithUser" />
      <div class="chat__body">
        <div class="chat__title">Chat</div>
        <div class="chat__content" ref="chatContent">
          <div class="chat__subheader"></div>
          <div class="chat__content-wrapper">
            <template v-if="!Object.keys(dataChatOptions).length">
              <span class="chat__alert"
                >Select the user you want to start a chat with</span
              >
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
        <div class="chat__form-container">
          <v-form ref="formChat" class="chat__form" @submit="onSubmit">
            <v-textarea
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
  },

  methods: {
    chatWithUser(friendId) {
      this.loader = true;
      this.$store
        .dispatch("fetchCreateSession", { friend_id: friendId })
        .then(() => {
          this.connectChannel(this.dataChatOptions);
        });
    },

    connectChannel(chatOptions) {
      window.Echo.leave(`room.${chatOptions.id}`);

      const channel = window.Echo.private(`room.${chatOptions.id}`);

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

  &__body {
    padding: 4px;
    width: 100%;
  }

  &__content {
    padding: 8px;
    overflow-y: auto;
    max-height: calc(100% - 88px);
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
  }

  &__content-wrapper::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__form-container {
    background-color: white;
    width: 100%;
    padding: 4px 8px;
  }

  &__alert {
    font-size: 1.4em;
    display: flex;
    width: 100%;
    height: 90%;
    align-items: center;
    justify-content: center;
    text-align: center;
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
