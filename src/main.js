import Vue from "vue";
import App from "./renderer/App.vue";
import router from "./renderer/router";
import store from "./renderer/store";
import vuetify from "./renderer/plugins/vuetify";
import i18n from "./renderer/setup/i18n";

Vue.config.productionTip = false;

Vue.component("loading-button", () =>
  import("@/renderer/components/base/LoadingButton")
);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
