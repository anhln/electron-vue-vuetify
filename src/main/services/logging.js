const fs = require("fs");
const path = require("path");
const { BrowserWindow } = require("electron");

class LoggingService {
  constructor() {
    this.logFilePath = path.join(__dirname, "logs.txt");
  }

  log(message) {
    const now = new Date();
    const logMessage = `${now.toLocaleString()} - ${message}\n`;

    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
        // ipcMain.sender.send("log", `Error writing to log file: ${err}`);
      }
    });

    for (const window of BrowserWindow.getAllWindows()) {
      window.webContents.send("log", logMessage);
    }
  }
}

let instance = null;

module.exports = {
  getInstance() {
    if (!instance) {
      instance = new LoggingService();
    }

    return instance;
  },
};
