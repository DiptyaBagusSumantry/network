const Models = require("../models/index.js");
const {
  handlerError,
  handleGet,
} = require("../helper/HandlerError.js");
class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      // const ListDevice = await Models.ListDevice.findAll()
      // const ListSensor = await Models.ListSensor.findAll()
      const sensorData = await Models.DetailSensor.findAll();
      // const DataValues = await Models.DataValues.findAll()
      
      // return res.send(sensorData);

      // Menginisialisasi objek untuk menyimpan data yang sudah dikelompokkan berdasarkan device
const deviceData = {};

// Loop melalui data sensor untuk mengelompokkan dan menghitung data yang diperlukan
sensorData.forEach(sensor => {
  const deviceName = sensor.sensordata.parentdevicename;
  
  // Jika device belum ada di dalam objek, tambahkan
  if (!deviceData[deviceName]) {
    deviceData[deviceName] = {
      device: deviceName,
      maxPingTime: 0,
      maxPingJitterTime: 0,
      snmpDateTime: '',
      snmpUptimeStrength: ''
    };
  }

  // Proses data berdasarkan nama sensor
  if (sensor.sensordata.name === 'Ping') {
    const pingTime = parseFloat(sensor.sensordata.lastvalue.split(' ')[0]);
    if (pingTime > deviceData[deviceName].maxPingTime) {
      deviceData[deviceName].maxPingTime = pingTime;
    }
  } else if (sensor.sensordata.name === 'Ping Jitter') {
    const pingJitterTime = parseFloat(sensor.sensordata.lastvalue.split(' ')[0]);
    if (pingJitterTime > deviceData[deviceName].maxPingJitterTime) {
      deviceData[deviceName].maxPingJitterTime = pingJitterTime;
    }
  } else if (sensor.sensordata.name === 'SNMP System Uptime') {
    deviceData[deviceName].snmpDateTime = sensor.sensordata.lastup.split(' ')[0];
    deviceData[deviceName].snmpUptimeStrength = parseFloat(sensor.sensordata.uptime.replace('%', ''));
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
