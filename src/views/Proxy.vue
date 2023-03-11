<template>
  <v-container fluid>
    <h1>Proxy</h1>
    <proxy-table></proxy-table>
  </v-container>
</template>
<script>
  import ProxyTable from "@/components/proxy/ProxyTable.vue";

  export default {
    components: { ProxyTable },
  };
</script>
