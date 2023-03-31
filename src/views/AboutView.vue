<template>
  <v-container fluid class="pa-6">
    <v-card outlined>
      <v-card-title class="text-center justify-center">
          <h1>{{ title }}</h1>
      </v-card-title>
      <v-card-text>
        <v-container>
        <v-row>
          <h2 class="ml-1 mb-2">Contact </h2>
          <v-list-item  class="list-item">
              <v-list-item-icon class="mr-2">
                <v-icon size="20px">mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-title>+84.825409387</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item class="list-item">
              <v-list-item-icon class="mr-2">
                <v-icon>mdi-linkedin</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Linkedin: anhln</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item class="list-item">
              <v-list-item-icon class="mr-2">
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-title>anhlnster@gmail.com</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item>
        </v-row>
        </v-container>
        
      </v-card-text>
    </v-card>
   
  </v-container>
</template>
<script>

export default {
  data() {
    return {
      title: 'WELCOME TO WELOGIN'
    }
  },
}
</script>
<style lang="scss" scoped>
.list-item {
  &.v-list-item{
    max-height: 28px !important;
    padding: 4px ;
  }
  ::v-deep .v-list-item__icon {
    margin: auto;
  }
}
</style>