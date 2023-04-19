import { ipcMain, dialog } from "electron";
import { read } from "./readFileService";
import { openBrowser } from "./automationService";
import {
  checkProxy,
  checkHttpProxy,
  checkProxyStatus,
  checkProxyByUserPassword,
} from "./proxyService";

import { connect, connectWithExtra, runPuppeteer } from "./profileService";

import { getProfilesDirectory, saveProfilesDirectory } from "./filesService";
import { runPuppeteerWithScript } from "./automationService";

import { runChrome } from "./runChromium";

export async function ipcMainHandle() {
  ipcMain.handle("my-read", async () => {
    const result = await read();
    return result;
  });

  ipcMain.handle("open-website", async () => {
    await openBrowser();
  });

  //-----------proxy service -----------------/

  ipcMain.handle("checkProxy", async (event, proxy) => {
    try {
      await checkProxy(proxy);
      return "OK";
    } catch (error) {
      console.log(error);
      return "DIE";
    }
  });

  ipcMain.handle("checkHttpProxy", async (event, proxy) => {
    try {
      await checkHttpProxy(proxy);
      return "OK";
    } catch (error) {
      console.log(error);
      return "DIE";
    }
  });

  ipcMain.handle("checkProxyStatus", async (event, proxy) => {
    const proxyStatus = await checkProxyStatus(proxy);
    return proxyStatus;
  });

  ipcMain.handle(
    "checkProxyByUserPassword",
    async (event, address, userId, password) => {
      const proxy = checkProxyByUserPassword(address, userId, password);
      return proxy;
    }
  );
  // ----------------Database services ---------

  /*----------- Puppeteer services ----------------*/
  ipcMain.handle("connect", async (event, proxy) => {
    const result = await connect(proxy);
    return result;
  });

  ipcMain.handle("connectWithExtra", async (event, proxy) => {
    const result = await connectWithExtra(proxy);
    return result;
  });

  ipcMain.handle("runPuppeteer", async (event, proxy) => {
    const result = await runPuppeteer(proxy);
    return result;
  });

  // ------------------- Files services -------------*/
  ipcMain.handle("getProfilesDirectory", async () => {
    // check if profileDirectory exist
    const profileDirectory = await getProfilesDirectory();
    return profileDirectory;
  });

  ipcMain.handle("save-profiles-directory", async (event, profileDirectory) => {
    return await saveProfilesDirectory(profileDirectory);
  });

  ipcMain.handle("open-file-dialog", async (event, title) => {
    return dialog.showOpenDialogSync(null, {
      title: title,
      properties: ["openDirectory", "createDirectory"],
    });
  });

  //--------------------Chromium services ----------------------
  ipcMain.handle("openChromium", async (event, options) => {
    const child = runChrome();
    return child;
  });

  // ----------------------AUTOMATION ---------------------//
  ipcMain.handle("runPuppeteerWithScript", async (event, options) => {
    return runPuppeteerWithScript();
  });
}
