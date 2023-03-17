import store from "@/store";
import { VUE_ECHO } from "./createEcho";

export default (userId) => {
  VUE_ECHO.private("App.Models.User." + userId).notification((notification) => {
    if (!Object.keys(store.getters.getNotification).length) {
      store.dispatch("addNotification", notification);
    }
  });
};
