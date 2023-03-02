<template>
  <section class="container chat">
    <div class="chat__wrapper">
      <div class="chat__title">Chat</div>
      <div class="chat__body">
        <div class="chat__content">
          <div class="chat__content-wrapper">
            <VChatMessage
              v-for="(message, index) in messages"
              :key="`${index}`"
            />
          </div>
        </div>
        <div class="chat__form-container">
          <v-form id="formChat" class="chat__form">
            <v-textarea
              @keydown.enter="onSubmit"
              outlined
              rows="1"
              dense
              max-height="100px"
              auto-grow
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
          <v-btn color="success" @click="send">Send</v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VChatMessage from "@/components/UI/VChatMessage.vue";
// import { io } from "socket.io-client";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { PUSHER_APP_CLUSTER } from "@/constants";
import axios from "axios";

export default {
  components: { VChatMessage },
  data() {
    return {
      message: "",
      messages: [1, 2, 3, 4],
      newMessage: null,
      typing: false,
      username: null,
      ready: false,
      info: [],
      connections: 0,
      token: this.$store.getters.getAccessToken,
    };
  },

  created() {
    const newEcho = new Echo({
      authEndpoint: "http://localhost:8000/api/broadcasting/auth",
      pusher: Pusher,
      broadcaster: "pusher",
      key: "livepost",
      cluster: `${PUSHER_APP_CLUSTER}`,
      forceTLS: false,
      wsHost: "localhost",
      wsPort: 6001,
      encrypted: true,
      enabledTransports: ["ws", "wss"],
      auth: {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getAccessToken,
        },
      },
      // authorizer: () => {
      //   return {
      //     authorize: () => {
      //       axios
      //         .post("http://localhost:8000/api/broadcasting/auth", {
      //           socket_id: "livepost",
      //           channel_name: "chat",
      //         })
      //         .then(() => {
      //           console.log("success");
      //         })
      //         .catch((error) => {
      //           console.log(error);
      //         });
      //     },
      //   };
      // },
    });

    const channel = newEcho.private("private.chat.1");

    channel
      .subscribed(() => {
        console.log("Subscribed!!");
      })
      .listen(".chat-message", (e) => console.log(e));
  },

  methods: {
    send() {
      axios.get("http://localhost:8000/api/playground").then((value) => {
        console.log(value);
      });
      // io("ws://localhost:6001");
      // socket.emit("private-public.playground.1", (a) => console.log(a));
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

    width: 50%;
    margin: 48px;
    font-family: "Rubik";
  }

  &__title {
    font-size: 1.4em;
    font-weight: bold;
    border-bottom: solid 1px rgb(206, 206, 206);
  }

  &__body {
    position: relative;
  }

  &__content {
    padding: 8px;
  }

  &__content-wrapper {
    height: 50vh;
    overflow: auto;
    border-radius: 8px;
    padding: 8px;
  }

  &__content-wrapper::-webkit-scrollbar {
    opacity: 0;
    width: 4px;
  }

  &__form-container {
    position: absolute;
    bottom: 0;
    background-color: white;
    width: 100%;
    padding: 4px 8px;
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
