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
      prtgversion: {
        type: Sequelize.STRING,
      },
      sensordata: {
        type: Sequelize.TEXT("long")
      },
      sensorId: {
        type: Sequelize.INTEGER
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
