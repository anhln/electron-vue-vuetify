<template>
  <v-container fluid>
    <h1>Settings</h1>
    <v-text-field v-model="proxyAddress"></v-text-field>
    <v-btn @click="openBrowser">OPEN PUPPETEER</v-btn>
    <v-btn @click="openBrowserWithExtra">OPEN PUPPETEER WITH EXTRA</v-btn>
  </v-container>
</template>
<script>
  export default {
    data: () => {
      return {
        proxyAddress: "",
      };
    },
    methods: {
      async openBrowser() {
        const proxy = {
          url: this.proxyAddress, // || "socks://192.168.1.200:1005",
          username: "",
          password: "",
        };
        await window.ipcRenderer.invoke("connect", proxy);
        console.log("OPENED");
      },
      async openBrowserWithExtra() {
        const proxy = {
          url: this.proxyAddress || "socks://13.127.55.36:80",
          username: "",
          password: "",
        };
        await window.ipcRenderer.invoke("connectWithExtra", proxy);
        console.log("OPENED");
      },
    },
  };
</script>
