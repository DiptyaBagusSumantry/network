const Sequelize = require("sequelize");

const DataValues = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "data_values",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      treesize: {
        type: Sequelize.STRING,
      },
      prtgversion: {
        type: Sequelize.STRING,
      },
      values: {
        type: Sequelize.TEXT("long"),
      },
      sensorId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};

module.exports = DataValues;
