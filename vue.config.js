const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      preload: "src/electron/preload.js",
      //   builderOptions: {
      //     productName: "Account manager",
      //     appId: "gpmaccountmgr",
      //     copyright: "Copyright ©2022",
      //     win: {
      //       icon: "src/assets/icons/icon.ico",
      //     },
      //     extraResources: [
      //       {
      //         from: "./public/app-extension",
      //         to: "app-extension",
      //       },
      //       {
      //         from: "node_modules/puppeteer",
      //         to: "node_modules/puppeteer",
      //       },
      //     ],
      //   },
      externals: ["puppeteer"],
    },
  },
});
