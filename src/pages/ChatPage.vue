<template>
  <section class="container chat">
    <div class="chat__wrapper">
      <div class="chat__title">Chat</div>
      <div class="chat__body">
        <div class="chat__content">
          <div class="chat__content-wrapper">
            <template v-if="!dataMessages.length">
              <span>There are not any messages...</span>
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
    };
  },

  created() {
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

    const channel = newEcho.channel("chat");
    console.log(channel);
    console.log(process.env.VUE_APP_PUSHER_KEY);

    channel
      .subscribed(() => {
        console.log("Subscribed!!");
      })
      .listen("SessionEvent", (data) => {
        console.log("SessionEvent");
        this.$store.commit("updateMessages", data);
        console.log(data);
      });
  },

  computed: {
    ...mapGetters({
      dataMessages: "getMessages",
    }),
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      const form = this.$refs.formChat.$el;
      const formData = new FormData(form);
      // formData.append("user", JSON.stringify(this.$store.getters.getAuthUser));
      formData.append("to_user", this.toUser);
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
