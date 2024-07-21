const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const ResponseController = require("../controllers/ResponseController.js");
const MonitoringController = require("../controllers/MonitoringController.js");
const ListSensorController = require("../controllers/ListSensorController.js");
const DashboardController = require("../controllers/DashboardController.js");
const ListDeviceController = require("../controllers/ListDeviceController.js");

router.post("/login", AuthController.Login);
router.post("/register", AuthController.register);
// router.get("/table-json/:type", verifyToken, ResponseController.tableJson);
// router.get("/table-xml", verifyToken, ResponseController.tableXML);
// router.get("/detail-sensor", verifyToken, ResponseController.detailSensor);

router.get(
  "/monitoring/:deviceId",
  verifyToken,
  MonitoringController.getMonitoring
);

router.get("/count-dashboard", verifyToken, DashboardController.countDashboard);
router.get("/list-sensor", verifyToken, ListSensorController.getListSensorById);
router.get("/akses-point", verifyToken, ListDeviceController.getDevice);
router.get(
  "/historicdata-csv/:type",
  verifyToken,
  ResponseController.historicDataCSV
);
router.get(
  "/historicdata-html/:type",
  verifyToken,
  ResponseController.historicDataHTML
);
router.get(
  "/get-svg",
  verifyToken,
  ResponseController.getSVG
);
router.get(
  "/list-group-id",
  verifyToken,
  ListDeviceController.getGroupId
);

module.exports = router;
