const Sequelize = require("sequelize");

const Router = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "router",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      mac_id: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "MAC ID Payment Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "MAC ID Payment Can't be Empty!",
          },
        },
      },
      ssid: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "SSID Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "SSID Can't be Empty!",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Password Can't be Empty!",
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

module.exports = Router;
