<template>
  <v-container fluid>
    <h1>Settings</h1>
    <v-btn @click="openBrowser">OPEN PUPPETEER</v-btn>
  </v-container>
</template>
<script>
  export default {
    methods: {
      async openBrowser() {
        // alert("OPEN PUPPETEER");
        await window.puppeteer.open("https://google.com");
        console.log("OPENED");
      },
    },
  };
</script>
