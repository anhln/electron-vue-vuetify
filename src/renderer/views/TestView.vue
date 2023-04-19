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
      @click="runPuppeteerWithScript"
      class="text-capitalize mr-2"
      :loading="loading"
      outlined
      ><v-icon left>mdi-run</v-icon>
      {{ loading ? "Running..." : "runPuppeteerWithScript" }}
    </v-btn>
    <v-btn
      @click="runAutoClickRepeatly"
      class="text-capitalize mr-2"
      :loading="loading"
      :disabled="loading"
    >
      {{ loading ? "Running..." : "runPuppeteerRepeatly" }}
    </v-btn>
    <v-btn @click="stopAutoClickRepeatly" outlined class="text-capitalize mr-2">
      <v-icon left>mdi-stop-circle</v-icon>Stop Repeatly</v-btn
    >
    <v-btn @click="stopRunSinglePuppeeter" outlined class="text-capitalize">
      <v-icon left>mdi-stop</v-icon>Stop</v-btn
    >

    <v-row class="mt-6 mx-1 text-log">
      <v-textarea
        id="textLogMessages"
        :value="messages"
        outlined
        placeholder="Running Log ...."
        @input="scrollToBottom"
        class="text-log"
        height="500"
      >
      </v-textarea>
    </v-row>
  </v-container>
</template>
<script>
  import * as _ from "lodash";

  export default {
    data: () => {
      return {
        proxyAddress: "",
        loading: false,
        messages: "",
        intervalId: null,
      };
    },
    mounted() {
      window.ipcRenderer.on("log", (event, message) => {
        this.messages = `${this.messages}${message}`;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      });

      window.ipcRenderer.on("puppeteer-status", (event, message) => {
        if (!_.isEmpty(message)) {
          const localMessage = JSON.stringify(message);
          this.messages = `${this.messages}${localMessage}`;
          if (!message.code && message.code == 0) this.loading = false;

          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      });
    },
    methods: {
      scrollToBottom() {
        setTimeout(() => {
          var textarea = document.getElementById("textLogMessages");
          textarea.scrollTop = textarea.scrollHeight;
        }, 200);
      },
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
      async stopAutoClickRepeatly() {
        clearInterval(this.intervalId);
      },

      async stopRunSinglePuppeeter() {
        await window.ipcRenderer.send("stop-puppeteer");
      },
      async runAutoClickRepeatly() {
        // this.loading = true;
        // this.runPuppeteer();
        this.runPuppeteerWithScript();
        this.intervalId = setInterval(
          // async () => await this.runPuppeteer(),
          async () => await this.runPuppeteerWithScript(),
          2 * 60 * 1000
        );
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
      async runPuppeteerWithScript() {
        this.loading = true;
        await window.ipcRenderer.invoke("runPuppeteerWithScript");
      },
    },
  };
</script>
<style lang="scss" scoped>
  .text-style {
    max-height: 100%;
    min-height: 80vh;
  }
</style>
