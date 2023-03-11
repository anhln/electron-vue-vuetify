import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import db from "./database/models";

Vue.config.productionTip = false;

// todo sqlite db
// sequelize
//   .authenticate()
//   .then(() => console.log("connected"))
//   .catch((err) => console.log(err));

// sequelize.sync({
//   force: true,
// });

Vue.component("loading-button", () =>
  import("@/components/base/LoadingButton")
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
