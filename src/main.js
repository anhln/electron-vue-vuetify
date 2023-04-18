import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./setup/i18n";

Vue.config.productionTip = false;

Vue.component("loading-button", () =>
  import("@/components/base/LoadingButton")
);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
