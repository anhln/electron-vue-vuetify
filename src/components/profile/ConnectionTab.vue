<template>
  <v-card flat class="pt-4">
    <v-card-text>
      <v-row class="mb-2"
        ><v-btn-toggle
          v-model="toggleProxy"
          mandatory
          dense
          active-class="active-toggle"
        >
          <v-btn small class="btn-default">Without Proxy</v-btn>
          <v-btn small class="btn-default">Your Proxy</v-btn>
        </v-btn-toggle></v-row
      >
      <v-row
        class="d-flex justify-center align-center"
        v-if="toggleProxy === 1"
      >
        <h4>{{ $t("ip") }}</h4>
        <v-select
          class="ml-2"
          dense
          outlined
          clearable
          hide-details
          :items="proxiesList"
          item-text="name"
          item-value="id"
          v-model="profile.ProxyId"
        ></v-select>
        <v-btn
          class="ml-2 btn-check btn-default"
          :disabled="!profile.ProxyId"
          >{{ $t("check") }}</v-btn
        >
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
            v-model="profile.timezone"
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
            v-model="profile.webrtc"
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
            v-model="profile.geolocation"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { fetchProxyList } from "@/database/controller/welogin.controller";
  import { aryIannaTimeZones } from "@/utils/timezones";
  import { webrtcList, GEOLocation, ResolutionList } from "@/utils/webRTC";

  import { cloneDeep } from "lodash";

  export default {
    name: "ConnectionTab",
    props: {
      value: {
        type: Object,
        required: true,
      },
    },
    data: () => {
      return {
        toggleProxy: 0,
        profile: {},
        proxiesList: [],
        emitEvent: false,
        searchTerm: "",
        selectedTimezone: "",
        timezonesList: aryIannaTimeZones,
        webrtcList: [],
        GEOLocation: GEOLocation,
        resolutionList: ResolutionList,
      };
    },
    watch: {
      profile: {
        handler(newProfile) {
          if (this.emitEvent) {
            console.log(newProfile);
            this.$emit("input", newProfile);
          } else {
            this.emitEvent = true;
          }
        },
        deep: true,
      },
      value: {
        handler() {
          if (this.value) {
            this.profile = cloneDeep(this.value);
            this.emitEvent = false;
          }
        },
        deep: true,
        immediate: true,
      },
    },
    async created() {
      const proxies = await fetchProxyList();
      this.proxiesList = proxies.map((currentItem) => {
        return {
          id: currentItem.id,
          name: `${currentItem.type}://${currentItem.ipport}`,
        };
      });
      this.webrtcList = Object.keys(webrtcList).map((currentItem) => {
        return {
          id: currentItem,
          name: webrtcList[currentItem],
        };
      });
    },
    methods: {
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
  .btn-check {
    background-color: #29b6f6 !important;
    color: white !important;
  }
  .active-toggle {
    background-color: #29b6f6 !important;
    color: white !important;
  }
</style>
