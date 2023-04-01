const fs = require("fs");
const path = require("path");
const app = require("electron").app;

const SETTING_FILE = "setting.json";

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

export async function getProfilesDirectory() {
  // check setting directory exist 
  if(!fs.existsSync(path.join(app.getPath("userData"), `${SETTING_FILE}`)))
    return path.join(app.getPath("userData"), `/profiles`);
  else {
    const data = await fs.readFileSync(
      path.join(app.getPath("userData"), `${SETTING_FILE}`),
      {
        encoding: "utf8",
      }
    );
    if (data){
      try {
        const config = JSON.parse(data);
        return config.profilesDirectory;
      } catch (error) {
        console.log("ERROR parsing JSON string", error)
      }
    }
  }
}

export async function saveProfilesDirectory(profilesDirectory)  {
  try {
    const config = {
      profilesDirectory: profilesDirectory,
    } ;
    const jsonString = JSON.stringify(config);
    const result = await fs.writeFileSync(
      path.join(app.getPath("userData"), `${SETTING_FILE}`), jsonString );
    return result;
  } catch (error) {
    console.log(error);
  }
}