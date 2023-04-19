<template>
  <v-btn v-bind="{ ...$attrs, loading: loadingProp }">
    <template v-slot:loader>
      <v-icon v-if="showCheck" class="check-icon">mdi-check</v-icon>
      <v-progress-circular indeterminate size="23" :width="2" v-else />
    </template>
    <slot>Save</slot>
  </v-btn>
</template>

<script>
  export default {
    name: "LoadingButton",
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      loading(isLoading) {
        if (isLoading) {
          this.startLoading();
          return;
        }
        this.checkStopLoading();
      },
    },
    data() {
      return {
        loadingProp: false,
        loadingStartTime: null,
        showCheck: false,
      };
    },
    methods: {
      startLoading() {
        this.loadingStartTime = new Date().valueOf();
        this.loadingProp = true;
      },
      checkStopLoading() {
        const timeDifference = new Date().valueOf() - this.loadingStartTime;
        if (timeDifference < 500) {
          setTimeout(() => this.stopLoading(), 500 - timeDifference);
          return;
        }
        this.stopLoading();
      },
      stopLoading() {
        this.showCheck = true;
        setTimeout(() => {
          this.showCheck = false;
          this.loadingProp = false;
        }, 1500);
      },
    },
  };
</script>

<style scoped>
  .check-icon {
    color: inherit;
  }
</style>
