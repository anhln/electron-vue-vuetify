const fs = require("fs/promises");
const path = require("path");

// const isBuild = process.env.NODE_ENV === "production";

export async function read() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../src/data/test.txt"),
      {
        encoding: "utf8",
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
