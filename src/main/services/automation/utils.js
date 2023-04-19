const getHrefs = async (page) => {
  const result = await page.evaluate(() => {
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
  return result;
};

function generateRegExp(input) {
  // Escape any special characters in the input string
  const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Generate a regular expression pattern that matches the input string
  const pattern = new RegExp(escapedInput, "i");

  return pattern;
}

module.exports = { getHrefs, generateRegExp };
