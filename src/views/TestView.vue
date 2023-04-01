<template>
    <v-container fluid class="pa-6">
      <h1 class="mb-4">Test</h1>
      <p>{{ $t("message") }}</p>
      <v-text-field outlined v-model="proxyAddress" 
      placeholder="Proxy Address"></v-text-field>
      <v-btn @click="openBrowser" class="text-capitalize mr-2">OPEN PUPPETEER</v-btn>
      <v-btn @click="openBrowserWithExtra" class="text-capitalize">OPEN PUPPETEER WITH EXTRA</v-btn>
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