import { contextBridge, ipcRenderer } from "electron";

window.ipcRenderer = ipcRenderer;
// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("files", {
//   read: () => ipcRenderer.invoke("my-read"),
// });

// contextBridge.exposeInMainWorld("puppeteer", {
//   open: (url) => ipcRenderer.invoke("open-website", url),
// });

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld("ipcRenderer", {
//   send: (channel, data) => {
//     // whitelist channels
//     let validChannels = ["toMain"];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, data);
//     }
//   },
//   receive: (channel, func) => {
//     let validChannels = ["fromMain"];
//     if (validChannels.includes(channel)) {
//       // Deliberately strip event as it includes `sender`
//       ipcRenderer.on(channel, (event, ...args) => func(...args));
//     }
//   },
// });
