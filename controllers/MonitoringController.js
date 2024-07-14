const Models = require("../models/index.js");

class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      const sensorData = await Models.DetailSensor.findAll();
      // const DataValues = await Models.DataValues.findAll()

      // return res.send(DetailSensor);

      // Menginisialisasi objek untuk menyimpan data yang sudah dikelompokkan berdasarkan device
      const deviceData = {};

      // Loop melalui data sensor untuk mengelompokkan dan menghitung data yang diperlukan
      sensorData.forEach((sensor) => {
        const deviceName = sensor.sensordata.parentdevicename;

        // Jika device belum ada di dalam objek, tambahkan
        if (!deviceData[deviceName]) {
          deviceData[deviceName] = {
            kecepatanDownload: null,
            kecepatanUpload: null,
            ping: 0,
            jitter: 0,
            ssid: deviceName,
            presentaseKekuatanSinyal: "",
            waktu: "",
            // ssid: deviceName,
            // ping: 0,
            // jitter: 0,
            // waktu: "",
            // presentaseKekuatanSinyal: "",
          };
        }

        // Proses data berdasarkan nama sensor
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

      // Mengubah objek menjadi array
      const result = Object.values(deviceData);

      console.log(result);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MonitoringController;
