<template>
  <v-container fluid>
    <h1>Profiles</h1>
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
