const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("files", {
  read: () => ipcRenderer.invoke("my-read"),
});

contextBridge.exposeInMainWorld("puppeteer", {
  open: (url) => ipcRenderer.invoke("open-website", url),
});
