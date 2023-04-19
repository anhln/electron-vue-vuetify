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
  import AppBar from "@/renderer/layout/AppBar.vue";
  import SideBar from "@/renderer/layout/SideBar.vue";

  export default {
    name: "Home",
    components: {
      AppBar,
      SideBar,
    },
    data: () => ({
      drawer: null,
      items: [
        { title: "Profiles", icon: "mdi-account-group", to: "/profiles" },
        { title: "Proxy", icon: "mdi-cloud-check", to: "/proxy" },
        { title: "Groups", icon: "mdi-group", to: "/groups" },
        { title: "Settings", icon: "mdi-cog", to: "/settings" },
        { title: "Test", icon: "mdi-test-tube", to: "/test" },
        { title: "About", icon: "mdi-help-box", to: "/about" },
      ],
      right: null,
    }),
  };
</script>
