import puppeteer from "puppeteer";
const path = require("path");
const app = require("electron").app;

const settingFolder = path.join(app.getPath("documents"), "welogin");
// import cookiesExtraPlugin from "./profiles/cookiesExtraPlugin";
// import HelloWorldPlugin from "./profiles/helloWorldPlugin";

export const connect = async function (proxy) {
  const { url, username, password } = proxy;

  // 1. const options = generateOptions()
  // 2. open browser from puppeteer

  // pass proxy URL into the --proxy-server arg
  console.log(url, username, password);
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   args: [
  //     `--proxy-server=${url}`,
  //     `--user-data-dir=${settingFolder}/profile_3`,
  //   ],
  // });

  // const page = await browser.newPage();
  // await page.setUserAgent(
  //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
  // );
  const options = {
    headless: false,
  };
  const browser = await puppeteer.launch(options);
  const page = (await browser.pages())[0];
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
  );
  await page.goto("https://developer.chrome.com/");
  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Authenticate our proxy with username and password
  // await page.authenticate({ username, password });

  // await page.goto("https://www.google.com");
  // await browser.close();
};

export const connectWithExtra = async function (proxy) {
  const { url, username, password } = proxy;
  // puppeteer-extra is a drop-in replacement for puppeteer,
  // it augments the installed puppeteer with plugin functionality
  const puppeteer = require("puppeteer-extra");
  // add stealth plugin and use defaults (all evasion techniques)
  const StealthPlugin = require("puppeteer-extra-plugin-stealth");

  const stealth = StealthPlugin();
  // Remove this specific stealth plugin from the default set
  stealth.enabledEvasions.delete("user-agent-override");
  puppeteer.use(stealth);

  // // Stealth plugins are just regular `puppeteer-extra` plugins and can be added as such
  // const UserAgent = require("puppeteer-extra-plugin-stealth");
  // // // Define custom UA and locale
  // const ua = UserAgent({
  //   userAgent: "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
  //   locale: "de-DE,de",
  // });
  // stealth.enabledEvasions.push(ua);
  puppeteer.use(
    require("puppeteer-extra-plugin-anonymize-ua")({
      customFn: (ua) => "MyCoolAgent/" + ua.replace("Chrome", "Beer"),
    })
  );

  // inject cusome plugin
  // const customPlugin = require("./profiles/cookiesExtraPlugin");
  // puppeteer.use(new HelloWorldPlugin());

  const cookies = [
    { name: "cookie1", value: "val1", domain: "iphey.com" },
    { name: "cookie2", value: "val2", domain: "iphey.com" },
    { name: "cookie3", value: "val3", domain: "example.com" },
  ];

  // puppeteer usage as normal
  puppeteer
    .launch({
      headless: false,
      args: [
        // `--proxy-server=${url}`,
        `--user-data-dir=${settingFolder}/profile_2`,
      ],
    })
    .then(async (browser) => {
      console.log("Running tests..");
      const page = await browser.newPage();

      await page.goto("https://iphey.com/");
      await page.waitForTimeout(5000);
      await page.setCookie(...cookies);
      // await page.screenshot({ path: "testresult.png", fullPage: true });
      // await browser.close();
      console.log(`All done, check the screenshot. ✨`);
    });
};
