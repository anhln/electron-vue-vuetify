<template>
  <v-card flat class="mt-4">
    <v-card-text class="connection-container">
      <v-row class="d-flex align-center mb-2">
        <h4>Browser</h4>
        <v-select class="default-select" hide-details dense outlined></v-select>
      </v-row>
      <v-row class="d-flex align-center mb-2">
        <h4>Os</h4>
        <v-select class="default-select" hide-details dense outlined></v-select>
      </v-row>
      <v-row class="d-flex align-center mb-2">
        <h4>User Agent</h4>
        <v-text-field
          class="user-agent-select"
          outlined
          hide-details
          dense
          v-model="profile.userAgent"
        ></v-text-field>
      </v-row>
      <v-row class="d-flex align-center mb-2">
        <h4>Language code</h4>
        <v-text-field
          class="default-select"
          hide-details
          outlined
          dense
        ></v-text-field>
      </v-row>
      <v-row class="d-flex align-center mb-2">
        <h4>URL start</h4>
        <v-text-field
          class="default-select"
          hide-details
          outlined
          dense
        ></v-text-field>
      </v-row>
      <v-row class="d-flex align-center mb-2">
        <h4>Os font</h4>
        <v-select class="default-select" hide-details dense outlined></v-select>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
  import { cloneDeep } from "lodash";

  export default {
    name: "SoftwareTab",
    props: {
      value: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        emitEvent: false,
        profile: {},
      };
    },
    watch: {
      profile: {
        handler(newProfile) {
          if (this.emitEvent) {
            this.$emit("input", newProfile);
          } else {
            this.emitEvent = true;
          }
        },
        deep: true,
      },
      value: {
        handler() {
          if (this.value) {
            this.profile = cloneDeep(this.value);
            this.emitEvent = false;
          }
        },
        deep: true,
        immediate: true,
      },
    },
  };
</script>
<style lang="scss" scoped>
  .connection-container {
    .default-select {
      max-width: 300px;
    }
    .user-agent-select {
      max-width: 100%;
    }
    h4 {
      width: 130px;
    }
  }
</style>
