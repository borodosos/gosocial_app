import { PUSHER_APP_HOST, PUSHER_APP_KEY, VUE_BROADCASTER } from "@/constants";
import { PUSHER_APP_CLUSTER, PUSHER_APP_AUTH_ENDPOINT } from "../constants";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import connectToBroadcast from "./connectToBroadcast";

export default (accessToken, userId) => {
  if (window.Echo === undefined) {
    window.Echo = new Echo({
      authEndpoint: PUSHER_APP_AUTH_ENDPOINT,
      pusher: Pusher,
      broadcaster: VUE_BROADCASTER,
      key: PUSHER_APP_KEY,
      cluster: PUSHER_APP_CLUSTER,
      forceTLS: false,
      wsHost: PUSHER_APP_HOST,
      wsPort: 6001,
      encrypted: true,
      enabledTransports: ["ws", "wss"],
      auth: {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      },
    });

    connectToBroadcast(userId);
  }
};
