import store from "@/store";

export default (userId) => {
  window.Echo.private("App.Models.User." + userId).notification(
    (notification) => {
      store.dispatch("addNotification", notification);
    }
  );
};
