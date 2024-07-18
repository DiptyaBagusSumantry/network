const Models = require("../models/index.js");
const { handlerError, handleGet } = require("../helper/HandlerError.js");

class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      const sensorData = await Models.DetailSensor.findAll({
        where: {
          deviceId: req.params.deviceId,
        },
      });

      const deviceData = {};

      for (const sensor of sensorData) {
        const deviceName = sensor.sensordata.parentdevicename;

        if (!deviceData[deviceName]) {
          deviceData[deviceName] = {
            kecepatanDownload: 0,
            kecepatanUpload: 0,
            objid: sensor.sensordata.parentdeviceid,
            ping: 0,
            jitter: 0,
            ssid: deviceName,
            presentaseKekuatanSinyal: "",
            waktu: "",
            idSNMP: ""
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
        } else if (
          sensor.sensordata.name === "SNMP System Uptime" ||
          sensor.sensordata.name === "(004) GigabitEthernet0 Traffic"
        ) {
          const SNMP = await Models.DataValues.findOne({
            where: {
              sensorId: sensor.sensorId,
            },
          });
          if (SNMP) {
            const data = JSON.parse(SNMP.dataValues.values);
            console.log(data)
            deviceData[deviceName].waktu = data.datetime;
            deviceData[deviceName].kecepatanUpload = data["Traffic In (Speed)"];
            deviceData[deviceName].kecepatanDownload =
              data["Traffic Out (Speed)"];
            deviceData[deviceName].idSNMP = sensor.sensorId;
            deviceData[deviceName].presentaseKekuatanSinyal = parseFloat(
              sensor.sensordata.uptime.replace("%", "")
            );
          }
        }
      }

      const result = Object.values(deviceData);
      handleGet(res, result);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MonitoringController;
