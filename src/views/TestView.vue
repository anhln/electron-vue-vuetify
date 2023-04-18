<template>
  <v-container fluid class="pa-6">
    <h1 class="mb-4">Test</h1>
    <p>{{ $t("message") }}</p>
    <v-text-field
      outlined
      v-model="proxyAddress"
      placeholder="Proxy Address"
    ></v-text-field>
    <v-btn @click="openBrowser" class="text-capitalize mr-2"
      >OPEN PUPPETEER</v-btn
    >
    <v-btn @click="openBrowserWithExtra" class="text-capitalize mr-2"
      >OPEN PUPPETEER WITH EXTRA</v-btn
    >
    <v-btn
      @click="runAutoClickRepeatly"
      class="text-capitalize mr-2"
      :loading="loading"
      >runPuppeteer
      <span slot="loader">locating...</span>
    </v-btn>
    <v-btn @click="stopAutoClickRepeatly" class="text-capitalize">Stop</v-btn>
    <v-row class="mt-6 mx-1">
      <v-textarea :value="runningLog" outlined placeholder="Running Log ....">
      </v-textarea>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data: () => {
      return {
        proxyAddress: "",
        loading: false,
        runningLog: "",
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
      },
      async openBrowserWithExtra() {
        const proxy = {
          url: this.proxyAddress || "socks://13.127.55.36:80",
          username: "",
          password: "",
        };
        await window.ipcRenderer.invoke("connectWithExtra", proxy);
      },
      stopAutoClickRepeatly() {
        clearInterval();
      },
      async runAutoClickRepeatly() {
        this.loading = true;
        this.runPuppeteer();
        setInterval(async () => await this.runPuppeteer(), 5 * 60 * 1000);
        this.loading = false;
      },
      async runPuppeteer() {
        const config = {
          domain: "vnexpress.net",
          destinationUrl: "https://www.google.com",
          password: "",
        };
        await window.ipcRenderer.invoke("runPuppeteer", config);
      },
    },
  };
</script>
