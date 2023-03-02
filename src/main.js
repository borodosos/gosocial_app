import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PrimeVue from "primevue/config";
import VueFormulate from "@braid/vue-formulate";
import ToastService from "primevue/toastservice";
import vueDebounce from "vue-debounce";
// import sockets from "./plugins/socket";

Vue.use(VueFormulate);
Vue.use(ToastService);
Vue.use(vueDebounce);

// -- Styles
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "vue-advanced-cropper/dist/style.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  // sockets,
  PrimeVue,
  render: (h) => h(App),
}).$mount("#app");
