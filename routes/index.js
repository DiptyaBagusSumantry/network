const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
// const MedicineController = require("../controllers/AccessPointController.js");
// const PatientController = require("../controllers/MonitoringController.js");
// const RekamMedisController = require("../controllers/RouterController.js");
// const TransactionController = require("../controllers/TransactionController.js");
const { IsAdmin } = require("../middlewares/chekRole.js");
const ResponseController = require("../controllers/ResponseController.js");

router.post("/login", AuthController.Login);
router.get("/count-dashboard", AuthController.countDashbaord);
router.get("/table-json", verifyToken, ResponseController.tableJson);
router.get("/table-xml", verifyToken, ResponseController.tableXML);
router.get("/detail-sensor",verifyToken, ResponseController.detailSensor);
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
