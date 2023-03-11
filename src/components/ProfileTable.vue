<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="profileList"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Profiles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn>New Profiles</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Profile name"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Status"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.ProxyId"
                        :items="proxiesList"
                        item-value="id"
                        item-text="name"
                        outlined
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Note"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.ProxyId="{ item }">
        <div>{{ getName(item) }}</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-btn
          class="ml-2 text-capitalize btn-check"
          dark
          x-small
          depressed
          color="green"
          @click="openBrowser(item)"
        >
          <v-icon x-small class="mr-2">mdi-check</v-icon> Run
        </v-btn>
      </template>
    </v-data-table>
    <profile-dialog v-model="profileDialog"></profile-dialog>
  </div>
</template>
<script>
  import ProfileDialog from "./profile/ProfileDialog";

  import {
    createProfile,
    updateProfile,
    fetchProfilesList,
    fetchProxyList,
  } from "@/database/controller/welogin.controller";

  export default {
    components: {
      ProfileDialog,
    },
    data: () => ({
      profileDialog: false,
      profileList: [],
      proxiesList: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Status", value: "status" },
        { text: "Proxy", value: "ProxyId" },
        { text: "Last Running", value: "lastRunning" },
        { text: "Note", value: "note" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        status: 0,
        proxy: 0,
        lastRunning: 0,
        note: 0,
      },
      defaultItem: {
        name: "",
        status: 0,
        proxy: 0,
        lastRunning: 0,
        note: 0,
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "New Item" : "Edit Item";
      },
    },

    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },

    async created() {
      // await Profile.create({
      //   name: "profile 1",
      //   status: "OK",
      //   note: "test note",
      //   proxyId: 1,
      // });
      // await Profile.sync();
      await this.fetchProfileList();
      const proxies = await fetchProxyList();
      this.proxiesList = proxies.map((currentItem) => {
        return {
          id: currentItem.id,
          name: `${currentItem.type}://${currentItem.ipport}`,
        };
      });
    },
    methods: {
      async openBrowser(item) {
        console.log("item", item);
        const proxy = {
          url:
            `${item["Proxy.type"]}://${item["Proxy.ipport"]}` ||
            "socks://13.127.55.36:80",
          username: "",
          password: "",
        };
        console.log(proxy);
        await window.ipcRenderer.invoke("connect", proxy);
        console.log("OPENED", proxy);
      },
      getName(item) {
        return item.ProxyId
          ? item["Proxy.type"] + "://" + item["Proxy.ipport"]
          : "";
      },
      async fetchProfileList() {
        this.profileList = await fetchProfilesList();
        console.log(this.profileList);
      },

      editItem(item) {
        this.editedIndex = this.profileList.indexOf(item);
        this.editedItem = Object.assign({}, item);
        // this.dialog = true;
        this.profileDialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.profileList.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.profileList.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      async save() {
        if (this.editedIndex > -1) {
          console.log(this.editedItem);
          const result = await updateProfile(this.editedItem);
          console.log(result);
        } else {
          await createProfile(this.editedItem);
        }
        this.fetchProfileList();
        this.close();
      },
    },
  };
</script>
<style lang="scss" scoped>
  ::v-deep .v-data-table-header tr th {
    background-color: #2196f3;
    color: white !important;
  }
</style>
