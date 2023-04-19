<template>
  <v-navigation-drawer app permanent clipped width="160">
    <v-list dense nav>
      <v-list-item-group active-class="sidebar-active" v-model="itemGroup">
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon class="sidebar-icon">
            <v-icon size="20px" >{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
     </v-list-item-group>
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
    data: () => {
      return{
        itemGroup: 1
      } 
    }
  };
</script>

<style lang="scss" scoped>
.sidebar-active {
  background-color: #E1F5FE;
  color: #03A9F4;
  &::v-deep .v-list-item__icon {
    color: #03A9F4;
  }
  &::v-deep .v-list-item__title {
    color: #03A9F4;
  }
}
.sidebar-icon {
  margin-right: 16px !important;
}
</style>