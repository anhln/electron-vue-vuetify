const puppeteer = require("puppeteer");
const { getHrefs, generateRegExp } = require("./utils");

const input = JSON.parse(process.argv[2]);

(async () => {
  //   app.loggingService.log("Running browser ...");
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

  const browser = await puppeteer.launch({ ...options });
  const page = await browser.newPage();

  const searchQuery = input.search;
  await page.goto(input.url);

  //   app.loggingService.log(`Openning ${domain}`);

  try {
    await page.type('textarea[name="q"]', searchQuery);
  } catch (error) {
    await typeWithDelay(page, 'input[name="q"]', searchQuery, 100);
    // app.loggingService.log(error);
  }

  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  const hrefs = await getHrefs(page);

  const links = hrefs.filter(
    (href) =>
      href.match(generateRegExp(`https://${searchQuery}`)) ||
      href.match(generateRegExp(`http://${searchQuery}`))
  );

  for (const link of links) {
    try {
      await Promise.all([page.goto(link), page.waitForNavigation]);
    } catch (error) {
      //   app.loggingService.log(error.message);
    }
  }

  try {
    await browser.close();
    // app.loggingService.log(`Closed ${domain}`);
  } catch (error) {
    // app.loggingService.log(error.message);
  }
})();
