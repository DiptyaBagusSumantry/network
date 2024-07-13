const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const User = require("./UserModels.js");
const ListDevice = require("./ListDevice.js")
const ListSensor = require("./ListSensor.js")
const DetailSensor = require("./DetailSensor.js")
const DataValues = require("./DataValues.js")

const sequelizeInstance = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.sequelizeInstance = sequelizeInstance;
db.User = User(sequelizeInstance);
db.ListDevice = ListDevice(sequelizeInstance);
db.ListSensor = ListSensor(sequelizeInstance);
db.DetailSensor = DetailSensor(sequelizeInstance);
db.DataValues = DataValues(sequelizeInstance);

// // History Patient - Patient
// db.Patient.hasMany(db.HistoryPatient, {
//   foreignKey: {
//     name: "patientId",
//     type: Sequelize.UUID,
//     allowNull: false,
//   },
// });

// db.HistoryPatient.belongsTo(db.Patient, {
//   targetKey: "id",
// });
// // Transaction - Patient
// db.Patient.hasMany(db.Transaction, {
//   foreignKey: {
//     name: "patientId",
//     type: Sequelize.UUID,
//     allowNull: false,
//   },
// });

// db.Transaction.belongsTo(db.Patient, {
//   targetKey: "id",
// });
// // Transaction - HistoryPatient
// db.HistoryPatient.hasMany(db.Transaction, {
//   foreignKey: {
//     name: "historyPatientId",
//     type: Sequelize.UUID,
//     allowNull: false,
//   },
// });

// db.Transaction.belongsTo(db.HistoryPatient, {
//   targetKey: "id",
// });

module.exports = db;
