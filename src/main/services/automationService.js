const puppeteer = require("puppeteer");
const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");

let puppeteerProcess;

export const openBrowser = async (websiteUrl) => {
  let options = { headless: false };

  //   const urlObj = new URL(websiteUrl);
  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (req.resourceType() === "image") {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(websiteUrl);

    // iconUrl = await page.$eval(
    //   "link[rel='icon'],link[rel='shortcut icon']",
    //   (el) => el.href
    // );
    // await browser.close();

    // if (iconUrl == undefined) return undefined;

    // if (!iconUrl.includes("http")) {
    //   iconUrl = urlObj.origin + iconUrl;
    // }

    // eslint-disable-next-line no-empty
  } catch {}
  //   console.log("Icon: " + iconUrl);
};

export const runPuppeteerWithScript = async () => {
  const input = {
    url: "https://www.google.com",
    search: "vnexpress.net",
    screenshot: "./dist_electron/screenshot.png",
  };

  startPuppeteer(input);

  ipcMain.on("stop-puppeteer", () => {
    puppeteerProcess.kill();
  });
};

export const runPuppeteerWithScriptRepeatly = async () => {
  const input = {
    url: "https://www.google.com",
    search: "vnexpress.net",
    screenshot: "./dist_electron/screenshot.png",
  };

  startPuppeteer(input);

  ipcMain.on("stop-puppeteer", () => {
    puppeteerProcess.kill();
    app.loggingService.log(`Puppeteer process has been stopped`);
  });
};

function startPuppeteer(input) {
  puppeteerProcess = spawn("node", [
    // "./src/main/services/automation/puppeteer-script.js",
    "./src/main/services/automation/auto-click-script.js",
    JSON.stringify(input),
  ]);

  const mainWindow = getMainWindow();

  puppeteerProcess.stdout.on("data", (data) => {
    app.loggingService.log(`Puppeteer: ${data}`);
    mainWindow.webContents.send("puppeteer-status", { message: data });
  });

  puppeteerProcess.stderr.on("data", (data) => {
    app.loggingService.log(`Puppeteer Error: ${data}`);
    mainWindow.webContents.send("puppeteer-status", { error: data });
  });

  puppeteerProcess.on("exit", (code) => {
    app.loggingService.log(`Puppeteer process exited with code ${code}`);
    mainWindow.webContents.send("puppeteer-status", { code });
  });
}

const getMainWindow = () => {
  return BrowserWindow.getFocusedWindow();
};
