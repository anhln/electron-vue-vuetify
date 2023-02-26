<template>
  <router-view />
</template>

<script>
  export default {
    name: "App",

    data: () => ({
      //
    }),
    async mounted() {
      await window.files.read();
    },
  };
</script>
