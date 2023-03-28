<template>
  <v-dialog :value="value" max-width="900px">
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
          <v-row
            ><v-text-field
              outlined
              dense
              label="Name"
              v-model="editedItem.name"
            ></v-text-field>
            <v-select
              label="Group"
              :items="groupsList"
              item-text="name"
              item-value="id"
              class="ml-2"
              outlined
              dense
              v-model="editedItem.GroupId"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn @click="create()">
              <span v-if="!editedItem.id">Create</span>
              <span v-else>Edit</span></v-btn
            >
          </v-row>
          <v-row>
            <v-col cols="12" sm="7" md="7" class="col">
              <v-tabs v-model="tab">
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab class="tab-item">Connection</v-tab>
                <v-tab class="tab-item">Software</v-tab>
                <v-tab class="tab-item">Hardware</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card flat class="pt-4">
                    <v-card-text>
                      <v-row class="text-align-center">
                        <div><h4>IP</h4></div>
                        <v-select
                          class="ml-2"
                          dense
                          outlined
                          clearable
                          :items="proxiesList"
                          item-text="name"
                          item-value="id"
                          v-model="editedItem.ProxyId"
                        ></v-select>
                        <v-btn class="ml-2 btn">Check</v-btn>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>Timezone</h4></div>
                          <v-select
                            class="ml-2"
                            dense
                            outlined
                            :items="timezonesList"
                            clearable
                            v-model="editedItem.timezone"
                          >
                            <template v-slot:prepend-item>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-text-field
                                    v-model="searchTerm"
                                    placeholder="Search"
                                    @input="searchTimezones"
                                  ></v-text-field>
                                </v-list-item-content>
                              </v-list-item>
                              <v-divider class="mt-2"></v-divider> </template
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>WebRTC IP</h4></div>
                          <v-select
                            class="ml-2"
                            dense
                            outlined
                            :items="webrtcList"
                            item-text="name"
                            item-value="id"
                            v-model="editedItem.webrtc"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>GEO Location</h4></div>
                          <v-select
                            class="ml-2"
                            dense
                            outlined
                            :items="GEOLocation"
                            item-text="name"
                            item-value="id"
                            v-model="editedItem.geolocation"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="pt-4">
                    <v-card-text>
                      <v-row class="text-align-center">
                        <v-col>
                          <h4>Browser</h4>
                          <v-select class="ml-2" dense outlined></v-select>
                        </v-col>
                        <v-col>
                          <h4>Os</h4>
                          <v-select class="ml-2" dense outlined></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>User Agent</h4></div>
                          <v-text-field
                            outlined
                            dense
                            v-model="editedItem.userAgent"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>Language code</h4></div>
                          <v-text-field outlined dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>URL start</h4></div>
                          <v-text-field outlined dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>Os font</h4></div>
                          <v-select class="ml-2" dense outlined></v-select>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="pt-4">
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <div><h4>Screen Resolution</h4></div>
                          <v-select
                            class="ml-2"
                            dense
                            outlined
                            :items="resolutionList"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>canvas mode</h4></div>
                          <v-text-field outlined dense></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div><h4>WebGL Renderer</h4></div>
                          <v-text-field outlined dense></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-list dense class="list-summary">
                <v-list-item
                  v-for="(item, i) in Object.keys(editedItem)"
                  :key="i"
                >
                  <v-list-item-icon class="mr-1">
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
      <v-card-actions>
        <v-spacer /><v-btn @click="close">cancel</v-btn>
        <v-btn>OK</v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>
<script>
  import {
    fetchProxyList,
    fetchGroupsList,
  } from "@/database/controller/welogin.controller";
  import { aryIannaTimeZones } from "@/utils/timezones";
  import { generateFileName } from "@/utils/file";
  import { webrtcList, GEOLocation, ResolutionList } from "@/utils/webRTC";
  import _ from "lodash";

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
    data: () => {
      return {
        profileName: "",
        webrtcList: [],
        GEOLocation: GEOLocation,
        resolutionList: ResolutionList,
        searchTerm: "",
        selectedTimezone: "",
        timezonesList: aryIannaTimeZones,
        timezonesListCopy: [],
        tab: null,
        editedItem: {},
        groupsList: [],
        proxiesList: [],
        // dialog: false,
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
    mounted() {
      this.timezonesListCopy = [...this.timezonesList];
      this.webrtcList = Object.keys(webrtcList).map((currentItem) => {
        return {
          id: currentItem,
          name: webrtcList[currentItem],
        };
      });
    },
    async created() {
      const proxies = await fetchProxyList();
      this.proxiesList = proxies.map((currentItem) => {
        return {
          id: currentItem.id,
          name: `${currentItem.type}://${currentItem.ipport}`,
        };
      });
      this.groupsList = await fetchGroupsList();
    },
    methods: {
      create() {
        console.log(this.editedItem);
        this.$emit("save", this.editedItem);
        this.close();
      },
      close() {
        this.$emit("input", false);
        this.$nextTick(() => {
          this.editedItem = {};
          //   this.editedIndex = -1;
        });
      },
      searchTimezones() {
        console.log("searchTimezones");
        if (!this.searchTerm) {
          this.timezonesList = this.timezonesListCopy;
        }

        this.timezonesList = this.timezonesListCopy.filter((fruit) => {
          return (
            fruit.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
          );
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    padding: 12px !important;
  }
  .col {
    padding: 0px !important;
  }
  .tab-item {
    text-transform: none;
  }
  .list-summary {
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
  }
  .item-content {
    display: inline-block;
  }
</style>
