<template>
  <v-card flat class="pt-4">
    <v-card-text class="connection-container">
      <v-row class="d-flex align-center mb-2">
        <h4>Screen Resolution</h4>
        <v-select
          class="default-select"
          hide-details
          dense
          outlined
          :items="resolutionList"
        ></v-select>
      </v-row>
      <v-row class="d-flex align-center mb-2">
        <h4>Canvas mode</h4>
        <v-text-field
          class="default-select"
          hide-details
          outlined
          dense
        ></v-text-field>
      </v-row>
      <v-row class="d-flex align-center mb-2">
        <h4>WebGL Renderer</h4>
        <v-text-field
          class="default-select"
          hide-details
          outlined
          dense
        ></v-text-field>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
  import { cloneDeep } from "lodash";
  import { ResolutionList } from "@/utils/webRTC";

  export default {
    name: "HardwareTab",
    props: {
      value: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        resolutionList: ResolutionList,
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
    h4 {
      width: 130px;
    }
  }
</style>
