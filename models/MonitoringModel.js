const Sequelize = require("sequelize");

const Monitoring = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "monitoring",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      ping: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "PING Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "PING Can't be Empty!",
          },
        },
      },
      jitter: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Jitter Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Jitter Can't be Empty!",
          },
        },
      },
      ssid: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Code Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Code Can't be Empty!",
          },
        },
      },
      signal_strength_percentage: {
        type: Sequelize.STRING,
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
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Date Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Date Can't be Empty!",
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

module.exports = Monitoring;
