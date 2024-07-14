const Sequelize = require("sequelize");

const ListDevice = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "list_device",
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
      filter_parentid: {
        type: Sequelize.INTEGER,
      },
      devices: {
        type: Sequelize.TEXT("long"),
        get() {
            const rawValue = this.getDataValue('devices');
            return JSON.parse(rawValue);
        },
        set(value) {
            this.setDataValue('data', JSON.stringify(value));
        }
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};

module.exports = ListDevice;
