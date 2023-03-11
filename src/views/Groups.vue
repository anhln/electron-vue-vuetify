<template>
  <v-container fluid>
    <h1>Groups</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-form v-model="valid">
          <v-text-field
            outlined
            dense
            label="Name"
            v-model="name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Description"
            v-model="description"
          ></v-text-field>
          <v-btn
            @click="add"
            :disabled="!valid && editing"
            color="green"
            class="btn"
          >
            <v-icon class="mr-1">mdi-plus</v-icon>Add</v-btn
          >
          <v-btn
            @click="save"
            :disabled="!editing && !valid"
            color="green"
            class="btn ml-2"
          >
            <v-icon class="mr-1">mdi-check</v-icon>Save</v-btn
          >
          <v-btn
            @click="reset"
            :disabled="!editing && !valid"
            color="green"
            class="btn ml-2"
          >
            <v-icon class="mr-1">mdi-clear</v-icon>Clear</v-btn
          >
        </v-form>
      </v-col>
      <v-col cols="12" md="4">
        <v-list lines="two">
          <v-list-item-group color="primary" active-class="blue--text">
            <v-list-item
              v-for="item in groupsList"
              :key="item.id"
              @click="itemClick(item)"
            >
              <v-list-item-content>
                <v-list-item-icon> <v-icon>mdi-group</v-icon></v-list-item-icon>
                <v-list-item-title>{{ item.name }} </v-list-item-title>
                <v-list-item-subtitle>{{
                  item.description
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                ><div>
                  <v-icon>mdi-pencil</v-icon>
                  <v-icon>mdi-delete</v-icon>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list></v-col
      >
    </v-row>
  </v-container>
</template>
<script>
  // import Group from "@/database/models/group";
  import {
    createGroup,
    updateGroup,
    fetchGroupsList,
  } from "@/database/controller/welogin.controller";
  import * as _ from "lodash";

  export default {
    data: () => {
      return {
        valid: false,
        nameRules: [
          (v) => !!v || "Name is required",
          (v) => v.length <= 100 || "Name must be less than 10 characters",
        ],
        groupsList: [],
        name: "",
        description: "",
        selectedItem: {},
      };
    },
    computed: {
      editing() {
        return !_.isEmpty(this.selectedItem);
      },
    },
    async created() {
      this.groupsList = await fetchGroupsList();
    },
    methods: {
      async add() {
        await createGroup({
          name: this.name,
          description: this.description,
        });
        this.groupsList = await fetchGroupsList();
        this.reset();
      },
      async save() {
        await updateGroup({
          name: this.name,
          description: this.description,
        });
        this.groupsList = await fetchGroupsList();
      },
      itemClick(item) {
        this.selectedItem = item;
        console.log(this.selectedItem);

        this.name = item.name;
        this.description = item.description;
      },
      reset() {
        this.name = "";
        this.description = "";
      },
    },
  };
</script>
<style lang="scss" scoped>
  .btn.v-btn {
    text-transform: none;
    color: white;
    padding-left: 8px !important;
  }
</style>
