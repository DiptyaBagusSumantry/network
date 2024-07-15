const Models = require("../models/index.js");
const { handlerError, handleGet } = require("../helper/HandlerError.js");

class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      const sensorData = await Models.DetailSensor.findAll();
      const deviceData = {};
      sensorData.forEach((sensor) => {
        const deviceName = sensor.sensordata.parentdevicename;
        if (!deviceData[deviceName]) {
          deviceData[deviceName] = {
            kecepatanDownload: null,
            kecepatanUpload: null,
            objid: sensor.sensordata.parentdeviceid,
            ping: 0,
            jitter: 0,
            ssid: deviceName,
            presentaseKekuatanSinyal: "",
            waktu: "",
          };
        }
        if (sensor.sensordata.name === "Ping") {
          const pingTime = parseFloat(
            sensor.sensordata.lastvalue.split(" ")[0]
          );
          if (pingTime > deviceData[deviceName].ping) {
            deviceData[deviceName].ping = pingTime;
          }
        } else if (sensor.sensordata.name === "Ping Jitter") {
          const pingJitterTime = parseFloat(
            sensor.sensordata.lastvalue.split(" ")[0]
          );
          if (pingJitterTime > deviceData[deviceName].jitter) {
            deviceData[deviceName].jitter = pingJitterTime;
          }
        } else if (sensor.sensordata.name === "SNMP System Uptime") {
          deviceData[deviceName].waktu =
            sensor.sensordata.lastup.split(" ")[0];
          deviceData[deviceName].presentaseKekuatanSinyal = parseFloat(
            sensor.sensordata.uptime.replace("%", "")
          );
        }
      });
      const result = Object.values(deviceData);

      handleGet(res, result)
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MonitoringController;
