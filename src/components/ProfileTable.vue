<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="profileList"
      sort-by="calories"
      class="table-default"
    >
      <template v-slot:top>
        <v-toolbar flat class="table-toolbar" height="56" dense>
          <v-toolbar-title class="title">Profiles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="#03A9F4" class="btn" @click="profileDialog = true">
            <v-icon left> mdi-plus </v-icon>ADD PROFILE</v-btn
          >
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
        <v-btn
          class="mx-2 text-capitalize btn-run"
          dark
          small
          depressed
          color="green"
          @click="openBrowser(item)"
        >
          <!-- <v-icon x-small class="mr-2">mdi-check</v-icon> -->
          Run
        </v-btn>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>

        <!-- <v-btn
          class="ml-2 text-capitalize btn-check"
          dark
          x-small
          depressed
          color="green"
          @click="openBrowserDirectly(item)"
        >
          <v-icon x-small class="mr-2">mdi-check</v-icon> Run Directly
        </v-btn> -->
      </template>
    </v-data-table>
    <profile-dialog
      v-model="profileDialog"
      @save="save"
      :profileItem="editedItem"
    ></profile-dialog>
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
      editedItem: {},
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
      async openBrowserDirectly() {
        const browserProcess = await window.ipcRenderer.invoke("openChromium");
        console.log("Browser", browserProcess);
      },
      async openBrowser(item) {
        const proxy = {
          url: item["ProxyId"]
            ? `${item["Proxy.type"]}://${item["Proxy.ipport"]}`
            : "",
          username: "",
          password: "",
          profileName: item.name,
          userAgent: item.userAgent,
        };
        console.log(proxy);
        // await window.ipcRenderer.invoke("connect", proxy);
        await window.ipcRenderer.invoke("connectWithExtra", proxy);

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
        console.log(this.editedItem);
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
        this.profileDialog = false;
        this.$nextTick(() => {
          this.editedItem = {};
          this.editedIndex = -1;
        });
      },

      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = {};
          this.editedIndex = -1;
        });
      },
      async save(item) {
        console.log("result", item);
        if (!item?.id) {
          await createProfile(item);
        } else {
          // console.log(this.editedItem);
          const result = await updateProfile(item);
          console.log(result);
        }
        this.fetchProfileList();
        this.close();
      },
    },
  };
</script>
<style lang="scss" scoped>
  .table-toolbar {
    ::v-deep .v-toolbar__content {
      padding: 0px !important;
    }
  }
  .title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #333333;
  }
  .btn {
    color: white !important;
  }
</style>
