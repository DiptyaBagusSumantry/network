const Models = require("../models/index.js");
const { handleGet, handlerError } = require("../helper/HandlerError");

class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      const ListDevice = await Models.ListDevice.findAll({attributes: ['devices']})
      const ListSensor = await Models.ListSensor.findAll()
      const DetailSensor = await Models.DetailSensor.findAll()
      const DataValues = await Models.DataValues.findAll()
      
      // const monitoring = ListDevice[0].devices.map((data, x)=>{
      //   const{ objid, device} = data
      //   console.log(device)
      //   return{
      //     objid,
      //     device
      //   }
      // })
  
      return res.send(ListSensor)
      // return res.send(ListDevice[0].devices)

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
