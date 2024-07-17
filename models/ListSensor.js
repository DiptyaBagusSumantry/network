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
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("sensor");
          return JSON.parse(rawValue);
        },
        set(value) {
          this.setDataValue("sensor", value);
        },
      },
      filter_parentid: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
};

module.exports = ListSensor;
