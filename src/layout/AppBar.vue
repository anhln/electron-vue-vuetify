<template>
  <v-app-bar
    app
    color="#fcb69f"
    dark
    src="https://picsum.photos/1920/1080?random"
    permanent
    clipped-left
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
    <v-app-bar-title>WELOGIN APP</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>
