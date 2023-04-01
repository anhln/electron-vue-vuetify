import Sequelize from "sequelize";
const { remote } = window.require("electron");
import path from "path";
import { Proxy } from "./proxy";
import { Profile } from "./profile";
import { Group } from "./group";

const univDb = path.join(
  remote.app.getPath("userData"),
  "../data/welogin_new.sqlite"
);

const sequelize = new Sequelize({
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  sync: true,
  storage: univDb, // Chỉ dùng khi MS là SQLite
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.groups = Group(sequelize, Sequelize);
db.proxies = Proxy(sequelize, Sequelize);
db.profiles = Profile(sequelize, Sequelize);

db.proxies.hasMany(db.profiles);
db.groups.hasMany(db.profiles);
db.profiles.belongsTo(db.proxies);
// db.sequelize.sync({
//   alter: true,
// });

export default db;
