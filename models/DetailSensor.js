const Sequelize = require("sequelize");

const DetailSensor = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "detail_sensor",
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
      sensordata: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("sensordata");
          return JSON.parse(rawValue);
        },
        set(value) {
          this.setDataValue("sensordata", value);
        },
      },
      svg: {
        type: Sequelize.TEXT("long"),
      },
      csvdaily: {
        type: Sequelize.TEXT("long"),
      },
      csvweekly: {
        type: Sequelize.TEXT("long"),
      },
      csvmonthly: {
        type: Sequelize.TEXT("long"),
      },
      htmldaily: {
        type: Sequelize.TEXT("long"),
      },
      htmlweekly: {
        type: Sequelize.TEXT("long"),
      },
      htmlmonthly: {
        type: Sequelize.TEXT("long"),
      },
      sensorId: {
        type: Sequelize.INTEGER,
      },
      deviceId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
};

module.exports = DetailSensor;
