<template>
  <v-navigation-drawer app permanent clipped width="160">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> WELOGIN </v-list-item-title>
        <v-list-item-subtitle> App for managing </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    props: {
      items: {
        type: Array,
        require: true,
      },
    },
  };
</script>
