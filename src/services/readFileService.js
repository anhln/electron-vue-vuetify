const fs = require("fs/promises");
const path = require("path");

export async function read() {
  try {
    const data = await fs.readFile(path.join(__dirname, "/data/test.txt"), {
      encoding: "utf8",
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
