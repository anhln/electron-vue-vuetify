const fs = require("fs").promises;

// ... puppeteer code
export const saveCoookies = async (cookies, filePath) => {
  if (!cookies)
    await fs.writeFile(
      `${filePath}/cookies.json`,
      JSON.stringify(cookies, null, 2)
    );
};

export const getCookies = async (filePath) => {
  const cookiesString = await fs.readFile(`${filePath}/cookies.json`);
  const cookies = JSON.parse(cookiesString);
  return cookies;
};
