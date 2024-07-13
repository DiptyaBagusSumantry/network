const Sequelize = require("sequelize");

const ListSensor = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "list_sensor",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      prtg_version: {
        type: Sequelize.STRING,
      },
      treesize: {
        type: Sequelize.INTEGER,
      },
      sensor: {
        type: Sequelize.TEXT("long"),
      },
      filter_parentid: {
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

module.exports = ListSensor;
