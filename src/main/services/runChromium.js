const path = require("path");
const app = require("electron").app;
const { spawn } = require("child_process");

export class WeLogin {
    constructor(options){
        this.options = options;
    }
    async start(){

    }
    async stop(){

    }
    async getStatus() {
        return true;
    }
}

export const runChrome = () => {
    const child = spawn('/Users/lengocanh/anhln/mmo/chromium/src/out/Default/Chromium.app/Contents/MacOS/Chromium')
    child.stdout.on('data', (data) => {
        console.log(`stdout:\n${data}`);
      });
      
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      child.on('error', (error) => {
        console.error(`error: ${error.message}`);
      });
      
      child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    return child;
}