const fs = require("fs/promises");
const path = require("path");

export async function read() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../src/data/test.txt"),
      {
        encoding: "utf8",
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
