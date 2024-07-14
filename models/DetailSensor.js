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
        get() {
          const rawValue = this.getDataValue('sensordata');
          return JSON.parse(rawValue);
      },
      set(value) {
          this.setDataValue('sensordata', value);
      }
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

module.exports = DetailSensor;
