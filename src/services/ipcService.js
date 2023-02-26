import { ipcMain } from "electron";
import { read } from "./readFileService";
import { openBrowser } from "./automationService";

export async function ipcMainHandle() {
  ipcMain.handle("my-read", async () => {
    console.log("READING -------");
    const result = await read();
    return result;
  });

  ipcMain.handle("open-website", async () => {
    await openBrowser();
  });
}
