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
    <v-app-bar-title>WELOGIN</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn ico v-if="false">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>
