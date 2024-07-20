const Models = require("../models/index.js");
const { handlerError, handleGet } = require("../helper/HandlerError.js");

//Fungsi untuk mengambil data Values dari detail sensor
async function getDataValues(sensorId) {
  const data = await Models.DataValues.findOne({
    where: {
      sensorId: sensorId,
    },
  });
  return data;
}

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
            idSNMP: "",
            idPing: "",
            idJitter: "",
          };
        }

        if (sensor.sensordata.name === "Ping") {
          const SNMP = await getDataValues(sensor.sensorId);
          const data = JSON.parse(SNMP.dataValues.values);
          deviceData[deviceName].waktu = data.datetime;
          deviceData[deviceName].idPing = sensor.sensorId;
          const pingTime = parseFloat(
            sensor.sensordata.lastvalue.split(" ")[0]
          );
          if (pingTime > deviceData[deviceName].ping) {
            deviceData[deviceName].ping = pingTime;
          }
        } else if (sensor.sensordata.name === "Ping Jitter") {
          deviceData[deviceName].idJitter = sensor.sensorId;
          const pingJitterTime = parseFloat(
            sensor.sensordata.lastvalue.split(" ")[0]
          );
          if (pingJitterTime > deviceData[deviceName].jitter) {
            deviceData[deviceName].jitter = pingJitterTime;
          }
        } else if (
          sensor.sensordata.name === "SNMP System Uptime" ||
          sensor.sensordata.name === "(004) GigabitEthernet0 Traffic" ||
          sensor.sensordata.name === "(001) GigabitEthernet 0/1 Traffic"
        ) {
          const SNMP = await getDataValues(sensor.sensorId);
          if (SNMP) {
            const data = JSON.parse(SNMP.dataValues.values);
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
