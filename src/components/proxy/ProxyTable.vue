<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="proxyList"
      sort-by="calories"
      :loading="loader"
      class="table-default"
    >
      <template v-slot:top>
        <v-toolbar flat class="table-toolbar" height="56px">
          <v-toolbar-title>Proxies</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#03A9F4" dark class="btn-default" v-bind="attrs" v-on="on">
                ADD PROXY
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
                      <v-select
                        v-model="editedItem.type"
                        :items="typesList"
                        item-value="value"
                        item-text="name"
                        label="Type Proxy"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.ipport"
                        label="IP-Port"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="UserName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.status"
                        label="Status"
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
      <template v-slot:item.type="{ item }">
        {{ getName(item.type) }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-avatar size="32px" :color="item.status === 'DIE' ? 'red' : 'green'"
          ><span class="status">{{ item.status }}</span></v-avatar
        >
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-btn
          class="ml-2 text-capitalize btn-check"
          fab
          dark
          x-small
          depressed
          color="green"
          :loading="loading(item)"
          @click="checkStatus(item)"
        >
          <v-icon x-small class="">mdi-check</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import {
    createProxy,
    updateProxy,
    fetchProxyList,
  } from "@/database/controller/welogin.controller";
  export default {
    data: () => ({
      loader: false,
      loadings: [],
      typesList: ["http", "https", "socks4", "socks5"],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        { text: "IP-Port", value: "ipport" },
        { text: "User Name", value: "username" },
        { text: "Password", value: "password" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        type: "",
        ipport: "0",
        username: "",
        password: "",
        status: "",
      },
      defaultItem: {
        type: "http",
        ipport: "0",
        username: "0",
        password: "0",
        status: "0",
      },
      proxyList: [],
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
      this.fetchProxy();
    },

    methods: {
      async fetchProxy() {
        this.loader = true;
        this.proxyList = await fetchProxyList();
        this.loader = false;
      },
      loading(item) {
        return this.loadings.includes(item);
      },
      getName(id) {
        if (!id) return;
        return id.toUpperCase();
      },
      async checkStatus(item) {
        this.loadings.push(item); // = true;
        const status = await window.ipcRenderer.invoke("checkProxy", item);
        if (status) {
          item.status = status;
          await updateProxy(item);
        }
        const index = this.loadings.indexOf(item);
        if (index !== -1) this.loadings.splice(index, 1);
      },
      editItem(item) {
        this.editedIndex = this.proxyList.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.proxyList.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      async deleteItemConfirm() {
        this.deleteProxy(this.editedItem);
        this.fetchProxy();
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
      async deleteProxy(proxy) {
        await Proxy.destroy({ where: { id: proxy.id } }).then(
          function (rowDeleted) {
            // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
              console.log("Deleted successfully");
            }
          },
          function (err) {
            console.log(err);
          }
        );
        await Proxy.sync();
      },
      async save() {
        if (this.editedIndex > -1) {
          console.log(this.editedItem);
          await updateProxy(this.editedItem);
        } else {
          await createProxy(this.editedItem);
        }
        this.fetchProxy();
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
  .btn-check {
    &:hover {
      cursor: pointer;
      background-color: rgba(5, 175, 115, 0.523) !important;
    }
  }
  .status {
    color: #fff;
    font-size: 12px;
  }
</style>
