const Sequelize = require("sequelize");

const AccessPoint = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "access_point",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      ssid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "SSID Payment Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "SSID Payment Can't be Empty!",
          },
        },
      },
      signal_strength_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Signal Strength Percentage Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Signal Strength Percentage Can't be Empty!",
          },
        },
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};

module.exports = AccessPoint;
