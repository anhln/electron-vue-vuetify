import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/profiles",
        name: "Profiles",
        component: () => import("../views/Profiles.vue"),
      },
      {
        path: "/groups",
        name: "Groups",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/renderer/views/Groups.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/renderer/views/Settings.vue"),
      },
      {
        path: "/proxy",
        name: "Proxy",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/renderer/views/Proxy.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
      {
        path: "/test",
        name: "test",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/TestView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
