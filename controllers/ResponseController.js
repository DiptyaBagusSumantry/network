const { handleGet, handlerError } = require("../helper/HandlerError");
const connectionPRTG = require("../utils/connection");
const Models = require("../models/index.js");

class ResponseController {
  // static async tableJson(req, res) {
  //   const data = await connectionPRTG.tableJson(req.query);
  //   const { treesize, devices, sensor, values } = data;
  //   if (!req.params.type) {
  //     return res.send("please insert type");
  //   }
  //   if (req.params.type == "listdevice") {
  //     await Models.ListDevice.create({
  //       prtg_version: data["prtg-version"],
  //       treesize,
  //       devices: JSON.stringify(devices),
  //       filter_parentid: req.query.filter_parentid,
  //     });
  //   } else if (req.params.type == "listsensor") {
  //     await Models.ListSensor.create({
  //       prtg_version: data["prtg-version"],
  //       treesize,
  //       sensor: JSON.stringify(sensor),
  //       filter_parentid: req.query.filter_parentid,
  //     });
  //   } else if (req.params.type == "datavalues") {
  //     await Models.DataValues.create({
  //       prtgversion: data["prtg-version"],
  //       treesize,
  //       values: JSON.stringify(values),
  //       sensorId: req.query.id,
  //     });
  //   }
  //   if (data.errorConnection) {
  //     handlerError(res, data);
  //   }
  //   handleGet(res, data);
  // }
  // static async tableXML(req, res) {
  //   const data = await connectionPRTG.tableXML(req.query);
  //   if (data.errorConnection) {
  //     handlerError(res, data);
  //   }
  //   handleGet(res, data);
  // }
  // static async detailSensor(req, res) {
  //   const data = await connectionPRTG.detailSensor(req.query);
  //   const { prtgversion, sensordata } = data;
  //   await Models.DetailSensor.create({
  //     prtg_version: prtgversion,
  //     sensordata: JSON.stringify(sensordata),
  //     sensorId: req.query.id,
  //   });
  //   if (data.errorConnection) {
  //     handlerError(res, data);
  //   }
  //   handleGet(res, data);
  // }
  static async historicDataCSV(req, res) {
    await Models.DetailSensor.findOne({
      where: {
        sensor_id: req.query.id,
      },
      attributes: ["csv"],
      raw: true,
    }).then((data) => {
      if (!data) {
        return res.send(" Tidak ada data sensor ");
      }
      res.send(JSON.parse(data.csv));
    });
  }
  static async historicDataHTML(req, res) {
    await Models.DetailSensor.findOne({
      where: {
        sensor_id: req.query.id,
      },
      attributes: ["html"],
      raw: true,
    }).then((data) => {
      if (!data) {
        return res.send(" Tidak ada data sensor ");
      }
      res.send(JSON.parse(data.html));
    });
  }
  static async getSVG(req, res) {
    await Models.DetailSensor.findOne({
      where: {
        sensor_id: req.query.id,
      },
      attributes: ["svg"],
      raw: true,
    }).then((data) => {
      if (!data) {
        return res.send(" Tidak ada data sensor ");
      }
      res.send(JSON.parse(data.svg));
    });
  }
}
module.exports = ResponseController;
