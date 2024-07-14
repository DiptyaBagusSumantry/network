const Models = require("../models/index.js");
const { handleGet, handlerError } = require("../helper/HandlerError");
const connectionPRTG = require("../utils/connection");

async function fetchDevices() {
  const data = await connectionPRTG.tableJson(
    "content=devices}&usecaption=true&filter_parentid=${groupID}&columns=objid,device"
  );
  // const response = await fetch(url);
  // const data = await response.json();
  return data.devices;
}

async function fetchSensors(deviceId) {
  const data =
    await connectionPRTG.tableJson(`content=sensors&usecaption=true&filter_parentid=${deviceId}&columns=objid,sensor`);
  // const response = await fetch(url);
  // const data = await response.json();
  return data.sensors;
}

async function fetchSensorDetails(sensorId) {
  const data = await connectionPRTG.detailSensor(`id=${sensorId}&usecaption=true`);
  // const response = await fetch(url);
  // const data = await response.json();
  return data.sensordata;
}


class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      const ListDevice = await Models.ListDevice.findAll();
      const ListSensor = await Models.ListSensor.findAll();
      const DetailSensor = await Models.DetailSensor.findAll();
      const DataValues = await Models.DataValues.findAll();

      return res.send(ListDevice);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getMonitoringLive(req, res) {
    try {
      // const ListDevice = await connectionPRTG.tableJson(
      //   "content=devices}&usecaption=true&filter_parentid=${groupID}&columns=objid,device"
      // );
      // const ListSensor = await connectionPRTG.tableJson(
      //   "content=sensors}&usecaption=true&filter_parentid=${deviceId}&columns=objid,sensor"
      // );
      // const DetailSensor = await connectionPRTG.detailSensor(
      //   "id=${sensorId}&usecaption=true"
      // );

      const devices = await fetchDevices();
      const allDetails = [];

      for (const device of devices) {
        const sensors = await fetchSensors(device.objid);

        for (const sensor of sensors) {
          const details = await fetchSensorDetails(sensor.objid);
          allDetails.push({
            deviceName: device.device,
            sensorName: sensor.sensor,
            details: details,
          });
        }
      }
      console.log(allDetails);
      return res.send(allDetails)
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MonitoringController;
