<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedProxyType"
            :items="typesList"
            item-value="value"
            item-text="name"
            return-object
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="proxyAddress"
            label="PROXY ADDRESS"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field :value="proxyStatus"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="checkProxy()">Check Proxy</v-btn>
        <v-btn @click="checkProxyByUserPassword()">Check By UserPassword</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import * as proxies from "@/utils/proxies";

  export default {
    name: "CheckProxy",
    data: () => ({
      proxyAddress: "",
      proxyStatus: "",
      selectedProxyType: null,
      typesList: [],
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    }),
    watch: {
      selectedProxyType: {
        handler: function ({ value, name }) {
          console.log(name + value);
        },
      },
    },
    mounted() {
      this.typesList = proxies.proxyTypes;
    },
    methods: {
      async checkProxy() {
        await window.ipcRenderer.invoke("checkProxyStatus").then((result) => {
          this.proxyStatus = result;
        });
      },
      async checkProxyByUserPassword() {
        const address = this.proxyAddress || "103.197.251.202:80";
        await window.ipcRenderer
          .invoke("checkProxyByUserPassword", address, "anhln", "anhday")
          .then((result) => {
            this.proxyStatus = result;
          });
      },
    },
  };
</script>
