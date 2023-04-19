import puppeteer from "puppeteer";

const path = require("path");
const app = require("electron").app;

const settingFolder = path.join(app.getPath("documents"), "welogin");

export const connect = async function (proxy) {
  const { url, username, password, profileName } = proxy;

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
    args: [
      "--no-sandbox",
      "--enable-features=NetworkService",
      "--ignore-certificate-errors",
      `--proxy-server=${url}`,
      `--user-data-dir=${settingFolder}/${profileName}`,
    ],
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
  const { url, username, password, profileName, userAgent } = proxy;
  const options = {
    headless: false,
    args: [
      "--disable-webgl",
      "--no-sandbox",
      "--enable-features=NetworkService",
      "--ignore-certificate-errors",
      `--proxy-server=${url}`,
      `--user-data-dir=${settingFolder}/${profileName}`,
    ],
  };
  // puppeteer-extra is a drop-in replacement for puppeteer,
  // it augments the installed puppeteer with plugin functionality
  const puppeteer = require("puppeteer-extra");
  // add stealth plugin and use defaults (all evasion techniques)
  const StealthPlugin = require("puppeteer-extra-plugin-stealth");

  const stealth = StealthPlugin();
  // Remove this specific stealth plugin from the default set
  stealth.enabledEvasions.delete("user-agent-override");
  // stealth.enabledEvasions.delete("navigator.vendor");
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
      customFn: (ua) => `${userAgent}`, //+ ${ua.replace("Chrome", "Beer")}`,
    })
  );
  // Stealth plugins are just regular `puppeteer-extra` plugins and can be added as such

  // const nvp = NavigatorVendorPlugin({ vendor: "Apple Computer, Inc." }); // Custom vendor
  // puppeteer.use(nvp);

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
    // .launch({
    //   headless: false,
    //   args: [
    //     // `--proxy-server=${url}`,
    //     `--user-data-dir=${settingFolder}/profile_2`,
    //   ],
    // })
    .launch({
      ...options,
      executablePath:
        "/Users/lengocanh/anhln/mmo/chromium/src/out/Default/Chromium.app/Contents/MacOS/Chromium",
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
    })
    .catch(async (err) => {
      console.log(err.message);
    });
};

export const runPuppeteer = async function (config) {
  const { domain, destinationUrl, password, profileName, userAgent } = config;
  const options = {
    headless: false,
    args: [
      "--disable-webgl",
      "--no-sandbox",
      "--enable-features=NetworkService",
      "--ignore-certificate-errors",
      // `--proxy-server=${url}`,
      // `--user-data-dir=${settingFolder}/${profileName}`,
    ],
  };
  const puppeteer = require("puppeteer-extra");
  const StealthPlugin = require("puppeteer-extra-plugin-stealth");

  const stealth = StealthPlugin();
  puppeteer.use(stealth);

  puppeteer
    .launch({
      ...options,
    })
    .then(async (browser) => {
      app.loggingService.log("Running browser ...");
      const page = await browser.newPage();

      await page.goto(destinationUrl);

      // Type search query
      const searchQuery = domain;
      app.loggingService.log(`Openning ${domain}`);

      try {
        await page.type('textarea[name="q"]', searchQuery);
      } catch (error) {
        app.loggingService.log("Can not type search query");
        // try another way
        await typeWithDelay(page, 'input[name="q"]', searchQuery, 100);
      }

      // Press enter to submit the search
      await page.keyboard.press("Enter");

      // Wait for search results to load
      await page.waitForNavigation();
      await page.waitForTimeout(5000);

      const hrefs = await page.evaluate(() => {
        const linkSnapshot = document.evaluate(
          "//a[@href]",
          document,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );
        const hrefs = [];
        for (let i = 0; i < linkSnapshot.snapshotLength; i++) {
          const link = linkSnapshot.snapshotItem(i);
          hrefs.push(link.href);
        }
        return hrefs;
      });

      const links = hrefs.filter(
        (href) =>
          href.match(generateRegExp(`https://${domain}`)) ||
          href.match(generateRegExp(`http://${domain}`))
      );

      // Click on the links have domain
      for (const link of links) {
        try {
          await Promise.all([page.goto(link), page.waitForNavigation]);
        } catch (error) {
          app.loggingService.log(error.message);
        }
      }
      try {
        await browser.close();
        app.loggingService.log(`Closed ${domain}`);
      } catch (error) {
        app.loggingService.log(error.message);
        app.loggingService.log(`Closed ${domain}`);
      }
    })
    .catch(async (err) => {
      app.loggingService.log(err.message);
    });
};

async function typeWithDelay(page, selector, text, delay) {
  const element = await page.$(selector);
  for (let i = 0; i < text.length; i++) {
    await element.type(text[i], { delay: delay });
  }
}

function generateRegularExpression(domain) {
  const parts = domain.split(".");
  return [`/https\:\/\/${parts.join(".")}`, `/http\:\/${parts.join(".")}`];
}

function generateRegExp(input) {
  // Escape any special characters in the input string
  const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Generate a regular expression pattern that matches the input string
  const pattern = new RegExp(escapedInput, "i");

  return pattern;
}

async function scrollToBottom(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
