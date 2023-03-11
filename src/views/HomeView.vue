<template>
  <v-app>
    <side-bar :items="items"></side-bar>
    <app-bar></app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import AppBar from "@/layout/AppBar.vue";
  import SideBar from "@/layout/SideBar.vue";

  export default {
    name: "Home",
    components: {
      AppBar,
      SideBar,
    },
    data: () => ({
      drawer: null,
      items: [
        { title: "Profiles", icon: "mdi-movie-star", to: "/profiles" },
        { title: "Groups", icon: "mdi-group", to: "/groups" },
        { title: "Settings", icon: "mdi-account-settings", to: "/settings" },
        { title: "Proxy", icon: "mdi-cloud-check", to: "/proxy" },
        { title: "About", icon: "mdi-help-box", to: "/about" },
      ],
      right: null,
    }),
  };
</script>
