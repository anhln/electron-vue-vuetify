const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    externals: {
      sequelize: "require('sequelize')",
    },
    // resolve: {
    //   fallback: {
    //     fs: false,
    //     crypto: false,
    //   },
    // },
    // // target: "electron-main",
    // target: ["node"],
  },
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      mainProcessWatch: ["src/services/profileService.js"], // change to your file
      chainWebpackMainProcess: (config) => {
        config.module
          .rule("unlazy-loader")
          .test(/\.js$/)
          .use("unlazy-loader")
          .loader("unlazy-loader")
          .end();
      },
      preload: "src/electron/preload.js",
      builderOptions: {
        productName: "WELOGIN",
        appId: "welogin",
        copyright: "Copyright ©2023",
        nodeIntegration: true,
        contextIsolation: false,
        // win: {
        //   icon: "src/assets/icons/icon.ico",
        // },
        extraResources: [
          "src/data/data.db",
          "src/database.txt",
          "src/data/test.txt",
          "src/services/profiles/cookiesExtraPlugin",
          {
            from: "./public/app-extension",
            to: "app-extension",
          },
          {
            from: "node_modules/puppeteer",
            to: "node_modules/puppeteer",
          },
          {
            from: "node_modules/proxy-agent",
            to: "node_modules/proxy-agent",
          },
          {
            from: "node_modules/request",
            to: "node_modules/request",
          },
        ],
      },
      externals: [
        "fs",
        "puppeteer",
        "request",
        "proxy-agent",
        "puppeteer-extra",
        "puppeteer-extra-plugin",
        "puppeteer-extra-plugin-stealth",
        "sequelize",
        "kind-of",
        "puppeteer-extra-plugin-anonymize-ua",
        "./profiles/cookiesExtraPlugin",
        "helloWorldPlugin",
        "puppeteer-extra-plugin-stealth/evasions/navigator.vendor",
      ],
      nodeModulesPath: ["./node_modules", "./src/services/profiles"],
    },
  },
});
