export const Group = (sequelize, DataTypes) => {
  const group = sequelize.define(
    "Group",
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
      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return group;
};

