<template>
  <v-container fluid class="pa-6">
    <profile-table></profile-table>
  </v-container>
</template>
<script>
  import ProfileTable from "@/components/ProfileTable.vue";

  export default {
    name: "Profiles",
    components: {
      ProfileTable,
    },
  };
</script>
