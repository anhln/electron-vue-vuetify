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
      await window.ipcRenderer.invoke("my-read").then((result) => {
        console.log(result);
      });
    },
  };
</script>
