export const Proxy = (sequelize, DataTypes) => {
  const Proxy = sequelize.define(
    "Proxy",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM("http", "https", "socks4", "socks5"),
        allowNull: false,
      },
      ipport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Proxy;
};
