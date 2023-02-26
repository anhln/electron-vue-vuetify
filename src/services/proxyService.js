import puppeteer from "puppeteer";

// const { proxies } = require("@/utils/proxy");

export const connect = async function (proxy) {
  const { url, username, password } = proxy;

  // pass proxy URL into the --proxy-server arg
  const browser = await puppeteer.launch({
    args: [`--proxy-server=${url}`],
  });

  const page = await browser.newPage();

  // Authenticate our proxy with username and password
  await page.authenticate({ username, password });

  await page.goto("https://www.google.com");
  await browser.close();
};
