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
      const ListDevice = await connectionPRTG.tableJson(
        "content=devices}&usecaption=true&filter_parentid=${groupID}&columns=objid,device"
      );
      const ListSensor = await connectionPRTG.tableJson(
        "content=sensors}&usecaption=true&filter_parentid=${deviceId}&columns=objid,sensor"
      );
      const DetailSensor = await connectionPRTG.detailSensor(
        "id=${sensorId}&usecaption=true"
      );

      
      return res.send(ListDevice)

    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MonitoringController;
