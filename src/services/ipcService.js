import { ipcMain } from "electron";
import { read } from "./readFileService";
import { openBrowser } from "./automationService";
import {
  checkProxy,
  checkHttpProxy,
  checkProxyStatus,
  checkProxyByUserPassword,
} from "./proxyService";

import { connect, connectWithExtra } from "./profileService";

export async function ipcMainHandle() {
  ipcMain.handle("my-read", async () => {
    console.log("READING -------");
    const result = await read();
    return result;
  });

  ipcMain.handle("open-website", async () => {
    await openBrowser();
  });

  //-----------proxy service -----------------/

  ipcMain.handle("checkProxy", async (event, proxy) => {
    try {
      const result = await checkProxy(proxy);
      console.log(result.headers);
      return "OK";
    } catch (error) {
      console.log(error);
      return "DIE";
    }
  });

  ipcMain.handle("checkHttpProxy", async (event, proxy) => {
    try {
      const result = await checkHttpProxy(proxy);
      console.log(result.headers);
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
}
