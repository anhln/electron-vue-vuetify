<template>
  <v-dialog :value="value" class="profile-dialog">
    <v-card>
      <v-card-title
        ><v-icon class="mr-2" color="blue">mdi-account-circle</v-icon>
        <h2 v-if="!edit">Create Profile</h2>
        <h2 v-else>Edit profile</h2>
        <v-spacer></v-spacer>

        <v-btn icon @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-4">
        <v-container fluid>
          <v-row class="d-flex align-start">
            <v-text-field
              class="text-name"
              outlined
              dense
              label="Name"
              v-model="editedItem.name"
            >
            </v-text-field>
            <v-select
              label="Group"
              :items="groupsList"
              item-text="name"
              item-value="id"
              class="ml-2 group-select"
              outlined
              dense
              v-model="editedItem.GroupId"
            ></v-select>
            <v-btn @click="close" depressed class="btn-cancel ml-4 mr-2">{{
              $t("cancel")
            }}</v-btn>
            <v-btn class="btn-ok" plain @click="create()">
              <span v-if="!editedItem.id">Create</span>
              <span v-else>Edit</span></v-btn
            >
          </v-row>
          <v-row>
            <v-col cols="12" sm="8" md="8" class="col">
              <v-tabs v-model="tab">
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab class="tab-item">Connection</v-tab>
                <v-tab class="tab-item">Software</v-tab>
                <v-tab class="tab-item">Hardware</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <connection-tab v-model="editedItem"></connection-tab>
                </v-tab-item>
                <v-tab-item>
                  <software-tab v-model="editedItem"></software-tab>
                </v-tab-item>
                <v-tab-item>
                  <hardware-tab v-model="editedItem" />
                </v-tab-item>
              </v-tabs-items>
            </v-col>
            <v-col cols="12" sm="4" md="4" class="px-0">
              <v-list dense class="list-summary">
                <v-list-item
                  v-for="(item, i) in Object.keys(editedItem)"
                  :key="i"
                >
                  <v-list-item-icon class="mr-1 icon">
                    <v-icon small>mdi-check</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content class="item-content">
                    <span>{{ item }}</span>
                    :
                    <span>{{ editedItem[item] }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { fetchGroupsList } from "@/database/controller/welogin.controller";
  import { generateFileName } from "@/utils/file";
  import _ from "lodash";
  import ConnectionTab from "./ConnectionTab.vue";
  import SoftwareTab from "./SoftwareTab.vue";
  import HardwareTab from "./HardwareTab.vue";

  export default {
    name: "ProfileDialog",
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      profileItem: {
        type: Object,
        default: () => {},
      },
    },
    components: {
      ConnectionTab,
      SoftwareTab,
      HardwareTab,
    },
    data: () => {
      return {
        profileName: "",
        tab: null,
        editedItem: {},
        groupsList: [],
        profileDefault: {
          name: "",
          GroupId: null,
          userAgent: "Mozilla/5.0 (",
          os: "Windows 10 32 bit",
          proxy: "No",
          screen: "1920x1080",
          timezone: "Base on IP",
          hardwareCore: "8",
          removeFontList: "14",
          acceptLanguage: "en-US",
          glRender: "random",
          audioContext: "random",
          cardName: "ANGLE",
          webRTC: "dynamic",
        },
      };
    },
    computed: {
      edit() {
        return !_.isEmpty(this.profileItem);
      },
    },
    watch: {
      profileItem: {
        handler(newval) {
          console.log("this.profileItem", newval);
          this.profileDefault.name = _.isEmpty(newval)
            ? `Profile_${generateFileName()}`
            : "";
          this.editedItem = _.isEmpty(this.profileItem)
            ? Object.assign({}, this.profileDefault)
            : this.profileItem;
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {},
    async created() {
      this.groupsList = await fetchGroupsList();
    },
    methods: {
      create() {
        this.$emit("save", this.editedItem);
        this.close();
      },
      close() {
        this.$emit("input", false);
        this.$nextTick(() => {
          this.editedItem = {};
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .profile-dialog {
    max-width: 600px;
    min-width: 550px;
    height: 550px;
    width: 100%;
  }
  .group-select {
    max-width: 250px;
  }
  .text-name {
    max-width: 300px;
  }
  .container {
    padding: 12px !important;
  }
  .col {
    padding: 0px !important;
  }
  .tab-item {
    text-transform: none;
    &.v-tab--active {
      background-color: #fff9c4;
    }
  }
  .list-summary {
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
    .v-list-item {
      min-height: 28px;
      padding: 0px 8px !important;
      .icon {
        padding: auto !important;
        margin: auto !important;
      }
      .v-list-item__content {
        padding: 0px 0px !important;
      }
    }
  }
  .item-content {
    display: inline-block;
  }
</style>
