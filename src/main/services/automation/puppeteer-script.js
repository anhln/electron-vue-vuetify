const puppeteer = require("puppeteer");

const input = JSON.parse(process.argv[2]);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const searchQuery = input.search;
  await page.goto(input.url);
  try {
    await page.type('textarea[name="q"]', searchQuery);
  } catch (error) {
    await typeWithDelay(page, 'input[name="q"]', searchQuery, 100);
    console.log(error);
  }
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.screenshot({ path: input.screenshot });

  await browser.close();
})();
