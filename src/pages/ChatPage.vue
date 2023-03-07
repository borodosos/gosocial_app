<template>
  <section class="container chat">
    <div class="chat__wrapper">
      <div class="chat__sidebar">
        <div class="chat__sidebar-title">Friends list</div>
        <div class="chat__sidebar-wrapper">
          <ul class="chat__sidebar-list">
            <template v-if="users.length">
              <li
                class="chat__sidebar-list-component"
                v-for="(user, index) in users"
                v-show="user.id !== $store.getters.getAuthUser.id"
                :key="index"
              >
                <v-btn
                  rounded
                  class="chat__sidebar-button"
                  @click="chatWithUser(user.id)"
                >
                  <v-avatar size="32" color="indigo lighten-1 mr-1">
                    <img
                      lazy-src="../assets/photos/defaultGiga.jpg"
                      :src="'http://localhost:8000/' + user?.image_profile"
                      alt="alt"
                    />
                  </v-avatar>
                  {{ user.first_name }} {{ user.second_name }}
                </v-btn>
              </li>
            </template>
            <template v-else>
              <span>Loading...</span>
            </template>
          </ul>
        </div>
      </div>
      <div class="chat__body">
        <div class="chat__title">Chat</div>
        <div class="chat__content">
          <div class="chat__subheader"></div>
          <div class="chat__content-wrapper">
            <template v-if="!Object.keys(dataChatOptions).length">
              <span class="chat__alert"
                >Select the user you want to start a chat with</span
              >
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VChatMessage from "@/components/UI/VChatMessage.vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { mapGetters } from "vuex";

export default {
  components: { VChatMessage },
  data() {
    return {
      message: "",
      toUser: this.$route.params.id,
      typing: false,
      users: [],
    };
  },

  mounted() {
    this.$store.dispatch("fetchAllUsers").then((value) => {
      this.users = value;
    });
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
      this.$store
        .dispatch("fetchCreateSession", { friend_id: friendId })
        .then(() => {
          this.connectChannel(this.dataChatOptions);
        });
    },

    connectChannel(chatOptions) {
      const newEcho = new Echo({
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

      const channel = newEcho.private(`room.${chatOptions.id}`);

      channel
        .subscribed(() => {
          console.log("Subscribed!!");
          this.$store.dispatch("fetchAllMessages", chatOptions.id);
        })
        .listen(".room-message", (data) => {
          this.$store.commit("pushMessage", data.message);
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
    height: 55vh;
    margin: 48px;
    font-family: "Rubik";
    display: flex;
    position: relative;
  }

  &__title {
    font-size: 1.4em;
    font-weight: bold;
    border-bottom: solid 1px rgb(206, 206, 206);
  }

  &__sidebar {
    padding: 4px 8px 8px 8px;

    border-radius: 8px;
    width: 30%;
    box-shadow: 0 0 8px #6aa5ff;
    background: linear-gradient(0deg, rgb(149, 255, 255), rgb(68, 186, 255));
  }

  &__sidebar-button.v-btn::v-deep {
    width: 100%;
    font-size: 0.8em;
    padding: 0;
    height: 42px;

    .v-btn__content {
      width: 100%;
      height: 100%;
      justify-content: start;
      padding: 0 8px;
    }
  }

  &__sidebar-wrapper {
    padding-top: 8px;
  }

  &__sidebar-title {
    font-size: 1.4em;
    font-weight: bold;
    border-bottom: solid 1px rgb(206, 206, 206);
  }

  &__sidebar-list::v-deep {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__sidebar-list-component + &__sidebar-list-component {
    padding-top: 8px;
  }

  &__body {
    padding: 4px;
    width: 70%;
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
