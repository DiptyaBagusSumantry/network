const { handleGet, handlerError } = require("../helper/HandlerError");
const connectionPRTG = require("../utils/connection");
const Models = require("../models/index.js");
const { Json } = require("sequelize/lib/utils");

class ResponseController {
  static async tableJson(req, res) {
    const data = await connectionPRTG.tableJson(req.query);
    const { treesize, devices, sensor, values } = data;
    if (!req.params.type) {
      return res.send("please insert type");
    }
    if (req.params.type == "listdevice") {
      await Models.ListDevice.create({
        prtg_version: data["prtg-version"],
        treesize,
        devices: JSON.stringify(devices),
        filter_parentid: req.query.filter_parentid,
      });
    } else if (req.params.type == "listsensor") {
      await Models.ListSensor.create({
        prtg_version: data["prtg-version"],
        treesize,
        sensor: JSON.stringify(sensor),
        filter_parentid: req.query.filter_parentid,
      });
    } else if (req.params.type == "datavalues") {
      await Models.DataValues.create({
        prtgversion: data["prtg-version"],
        treesize,
        values: JSON.stringify(values),
        sensorId: req.query.id,
      });
    }
    if (data.errorConnection) {
      handlerError(res, data);
    }
    handleGet(res, data);
  }
  static async tableXML(req, res) {
    const data = await connectionPRTG.tableXML(req.query);
    if (data.errorConnection) {
      handlerError(res, data);
    }
    handleGet(res, data);
  }
  static async detailSensor(req, res) {
    const data = await connectionPRTG.detailSensor(req.query);
    const { prtgversion, sensordata } = data;
    await Models.DetailSensor.create({
      prtg_version: prtgversion,
      sensordata: JSON.stringify(sensordata),
      sensorId: req.query.id,
    });
    if (data.errorConnection) {
      handlerError(res, data);
    }
    handleGet(res, data);
  }
  static async historicDataCSV(req, res) {
    const data = await connectionPRTG.historicDataCSV(req.query);
    // console.log("controller",data)
    if (data.errorConnection) {
      return handlerError(res, data);
    }
    handleGet(res, data);
  }
  static async historicDataHTML(req, res) {
    const data = await connectionPRTG.historicDataHTML(req.query);
    // console.log("controller",data)
    if (data.errorConnection) {
      return handlerError(res, data);
    }
    handleGet(res, data);
  }
}
module.exports = ResponseController;
