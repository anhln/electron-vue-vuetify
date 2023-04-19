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
        <v-form></v-form>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import * as proxies from "@/renderer/utils/proxies";

  export default {
    data: () => ({
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
  };
</script>
