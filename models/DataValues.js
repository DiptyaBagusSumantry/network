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
        get() {
          const rawValue = this.getDataValue('values');
          return JSON.parse(rawValue);
      },
      set(value) {
          this.setDataValue('values', value);
      }
      },
      sensorId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
};

module.exports = DataValues;
