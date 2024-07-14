const Models = require("../models/index.js");

class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      const ListDevice = await Models.ListDevice.findAll()
      const ListSensor = await Models.ListSensor.findAll()
      const DetailSensor = await Models.DetailSensor.findAll()
      const DataValues = await Models.DataValues.findAll()
      
      return res.send(ListDevice)

    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getMonitoringLive(req, res) {
    try {
      const ListDevice = await Models.ListDevice.findAll()
      const ListSensor = await Models.ListSensor.findAll()
      const DetailSensor = await Models.DetailSensor.findAll()
      const DataValues = await Models.DataValues.findAll()
      
      return res.send(ListDevice)

    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MonitoringController;
