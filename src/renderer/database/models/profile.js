export const Profile = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("OK", "DIE"),
      },
      lastRunning: {
        type: DataTypes.TIME,
      },
      note: {
        type: DataTypes.STRING,
      },
      timezone: {
        type: DataTypes.STRING(30),
      },
      webrtc: {
        type: DataTypes.ENUM("OFF", "BASE ON IP"),
        default: "OFF",
      },
      geolocation: {
        type: DataTypes.ENUM("OFF"),
      },
      browser: {
        type: DataTypes.ENUM("Chromium", "Chrome", "Firefox"),
        default: "Chromium",
      },
      os: {
        type: DataTypes.ENUM("MacOS", "Windows"),
      },
      userAgent: {
        type: DataTypes.STRING,
      },
      urlStart: {
        type: DataTypes.STRING(200),
      },
      osFont: {
        type: DataTypes.STRING,
      },
      screenSize: {
        type: DataTypes.STRING,
      },
      canvasMode: {
        type: DataTypes.STRING,
      },
      webglRenderer: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Profile;
};
