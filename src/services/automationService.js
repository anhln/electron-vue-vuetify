const puppeteer = require("puppeteer");

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
