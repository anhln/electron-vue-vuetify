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
    },
    {
      freezeTableName: true,
    }
  );

  return Profile;
};
