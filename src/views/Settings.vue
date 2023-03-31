<template>
  <v-container fluid class="pa-6">
    <v-card outlined class="pb-6 pt-4">
      <v-card-title class="text-center">
        <h2 class="mb-4">Settings</h2>
        
      </v-card-title>
      <v-card-text>
        <config-setting/>
      </v-card-text>
    </v-card>
  
   
  </v-container>
</template>
<script>

  export default {
    components: {
      'config-setting': () => import ('@/components/setting/ConfigSetting.vue')
    },
  };
</script>
