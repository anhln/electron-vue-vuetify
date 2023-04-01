<template>
  <v-container fluid class="pa-6">
    <proxy-table></proxy-table>
  </v-container>
</template>
<script>
  import ProxyTable from "@/components/proxy/ProxyTable.vue";

  export default {
    components: { ProxyTable },
  };
</script>
