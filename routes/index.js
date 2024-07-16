const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
// const MedicineController = require("../controllers/AccessPointController.js");
// const PatientController = require("../controllers/MonitoringController.js");
// const RekamMedisController = require("../controllers/RouterController.js");
// const TransactionController = require("../controllers/TransactionController.js");
const { IsAdmin } = require("../middlewares/chekRole.js");
const ResponseController = require("../controllers/ResponseController.js");
const MonitoringController = require("../controllers/MonitoringController.js");
const ListSensorController = require("../controllers/ListSensorController.js");
const DashboardController = require("../controllers/DashboardController.js")
const ListDeviceController = require("../controllers/ListDeviceController.js")

router.post("/login", AuthController.Login);
router.get("/table-json/:type", verifyToken, ResponseController.tableJson);
router.get("/table-xml", verifyToken, ResponseController.tableXML);
router.get("/detail-sensor", verifyToken, ResponseController.detailSensor);

router.get("/monitoring", verifyToken, MonitoringController.getMonitoring);

router.get("/count-dashboard", verifyToken, DashboardController.countDashboard);
router.get("/list-sensor", verifyToken, ListSensorController.getListSensorById);
router.get("/akses-point", verifyToken, ListDeviceController.getDevice);
router.get("/historicdata-csv", verifyToken, ResponseController.historicDataCSV);
router.get("/historicdata-html", verifyToken, ResponseController.historicDataHTML);




// router.post("/register", AuthController.register);
// router.post("/logout", verifyToken, AuthController.Logout);
// router.get("/fetch", verifyToken, AuthController.Fetch);

// //medicine
// router.post(
//   "/medicine",
//   verifyToken,

//   MedicineController.createMedicine
// );
// router.get("/medicine", verifyToken, MedicineController.getMedicine);
// router.get("/medicine/:id", verifyToken, MedicineController.getDetailMedicine);
// router.put("/medicine/:id", verifyToken, MedicineController.updatetMedicine);
// router.delete("/medicine/:id", verifyToken, MedicineController.deleteMedicine);

// //patient
// router.post("/patient", verifyToken, PatientController.createPatient);
// router.get("/patient", verifyToken, PatientController.getPatient);
// router.get("/patient/:id", verifyToken, PatientController.detailPatient);
// router.put("/patient/:id", verifyToken, PatientController.updatePatient);
// router.delete("/patient/:id", verifyToken, PatientController.deletePatient);

// //Rekam Medis
// router.post("/rekam-medis", verifyToken, RekamMedisController.createRekamMedis);
// router.get("/rekam-medis", verifyToken, RekamMedisController.getRM);
// router.get("/rekam-medis/:id", verifyToken, RekamMedisController.getDetailRM);
// router.get(
//   "/rekam-medis/patient/:id",
//   verifyToken,
//   RekamMedisController.getDetailbyPatient
// );
// router.delete(
//   "/rekam-medis/:id",
//   verifyToken,
//   RekamMedisController.deleteRekamMedis
// );

// //Invoice
// router.get("/invoice", verifyToken, TransactionController.getInvoice);
// router.put("/invoice/:id", verifyToken, TransactionController.updateInvoice);

module.exports = router;
