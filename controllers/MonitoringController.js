const Models = require("../models/index.js");

class MonitoringController {
  static async getMonitoring(req, res) {
    try {
      // const ListDevice = await Models.ListDevice.findAll()
      // const ListSensor = await Models.ListSensor.findAll()
      const sensorData = await Models.DetailSensor.findAll();
      // const DataValues = await Models.DataValues.findAll()
      
      // return res.send(DetailSensor);

      // const sensorData = [
      //   {
      //     sensordata: {
      //       name: "Ping",
      //       parentgroupname: "GroupDJKONTOL",
      //       parentdevicename: "Device",
      //       sensortype: "ping",
      //       interval: "60",
      //       probename: "Local Probe",
      //       statusid: "3",
      //       lastup: "45487.3941221296 [0 s ago]",
      //       lastdown: "45485.4571509838 [46 h 29 m ago]",
      //       lastcheck: "45487.3941221296 [0 s ago]",
      //       uptime: "70.8071%",
      //       uptimetime: "5 d 14 h 56 m",
      //       downtime: "29.1929%",
      //       downtimetime: "2 d 7 h 38 m",
      //       updowntotal: "0 s  [=74% coverage]",
      //       updownsince: "45476.6195965856 [10 d ago]",
      //       parentdeviceid: "2068",
      //       lastvalue: "0 msec (Ping Time)",
      //       lastmessage: "OK",
      //       statustext: "Up",
      //       info: "localprobe",
      //       favorite: "false",
      //     },
      //     id: "0d74da86-a646-493e-95cc-07ca92ad76a4",
      //     prtg_version: "24.2.96.1315+",
      //     sensorId: 2073,
      //     createdAt: "2024-07-14T09:27:32.000Z",
      //     updatedAt: "2024-07-14T09:27:32.000Z",
      //     deletedAt: null,
      //   },
      //   {
      //     sensordata: {
      //       name: "Ping Jitter",
      //       parentgroupname: "GroupDJKONTOL",
      //       parentdevicename: "Device",
      //       sensortype: "pingjitter",
      //       interval: "60",
      //       probename: "Local Probe",
      //       statusid: "3",
      //       lastup: "45487.3941221296 [0 s ago]",
      //       lastdown: "45485.4571509838 [46 h 29 m ago]",
      //       lastcheck: "45487.3941221296 [0 s ago]",
      //       uptime: "70.8071%",
      //       uptimetime: "5 d 14 h 56 m",
      //       downtime: "29.1929%",
      //       downtimetime: "2 d 7 h 38 m",
      //       updowntotal: "0 s  [=74% coverage]",
      //       updownsince: "45476.6195965856 [10 d ago]",
      //       parentdeviceid: "2068",
      //       lastvalue: "0 msec (Ping Jitter Time)",
      //       lastmessage: "OK",
      //       statustext: "Up",
      //       info: "localprobe",
      //       favorite: "false",
      //     },
      //     id: "1a2b3c4d-5678-90ef-ghij-klmnopqrstuv",
      //     prtg_version: "24.2.96.1315+",
      //     sensorId: 2074,
      //     createdAt: "2024-07-14T09:27:32.000Z",
      //     updatedAt: "2024-07-14T09:27:32.000Z",
      //     deletedAt: null,
      //   },
      //   {
      //     sensordata: {
      //       name: "SNMP System Uptime",
      //       parentgroupname: "GroupDJKONTOL",
      //       parentdevicename: "Device",
      //       sensortype: "snmp",
      //       interval: "60",
      //       probename: "Local Probe",
      //       statusid: "3",
      //       lastup: "45487.3941221296 [0 s ago]",
      //       lastdown: "45485.4571509838 [46 h 29 m ago]",
      //       lastcheck: "45487.3941221296 [0 s ago]",
      //       uptime: "70.8071%",
      //       uptimetime: "5 d 14 h 56 m",
      //       downtime: "29.1929%",
      //       downtimetime: "2 d 7 h 38 m",
      //       updowntotal: "0 s  [=74% coverage]",
      //       updownsince: "45476.6195965856 [10 d ago]",
      //       parentdeviceid: "2068",
      //       lastvalue: "0 msec (SNMP System Uptime)",
      //       lastmessage: "OK",
      //       statustext: "Up",
      //       info: "localprobe",
      //       favorite: "false",
      //     },
      //     id: "5e6f7a8b-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
      //     prtg_version: "24.2.96.1315+",
      //     sensorId: 2072,
      //     createdAt: "2024-07-14T09:27:32.000Z",
      //     updatedAt: "2024-07-14T09:27:32.000Z",
      //     deletedAt: null,
      //   },
      // ];

      // Menginisialisasi variabel untuk menyimpan hasil perhitungan
      let deviceName = "";
      let maxPingTime = 0;
      let maxPingJitterTime = 0;
      let snmpDateTime = "";
      let snmpUptimeStrength = "";

      // Loop melalui data sensor untuk melakukan perhitungan
      sensorData.forEach((sensor) => {
        if (sensor.sensordata.name === "Ping") {
          // Mengambil waktu maksimum dari sensor Ping
          const pingTime = parseFloat(
            sensor.sensordata.lastvalue.split(" ")[0]
          );
          if (pingTime > maxPingTime) {
            maxPingTime = pingTime;
          }
        } else if (sensor.sensordata.name === "Ping Jitter") {
          // Mengambil waktu maksimum dari sensor Ping Jitter
          const pingJitterTime = parseFloat(
            sensor.sensordata.lastvalue.split(" ")[0]
          );
          if (pingJitterTime > maxPingJitterTime) {
            maxPingJitterTime = pingJitterTime;
          }
        } else if (sensor.sensordata.name === "SNMP System Uptime") {
          // Mengambil waktu dari datetime sensor SNMP
          snmpDateTime = sensor.sensordata.lastup.split(" ")[0];

          // Menghitung presentasi kekuatan dari uptime sensor SNMP
          snmpUptimeStrength = parseFloat(
            sensor.sensordata.uptime.replace("%", "")
          );
        }

        // Mengambil nama device dari sensor pertama
        if (!deviceName && sensor.sensordata.parentdevicename) {
          deviceName = sensor.sensordata.parentdevicename;
        }
      });

      // Menampilkan hasil
      console.log(`Nama Device: ${deviceName}`);
      console.log(`Maximum Time dari Sensor Ping: ${maxPingTime} msec`);
      console.log(
        `Maximum Time dari Sensor Ping Jitter: ${maxPingJitterTime} msec`
      );
      console.log(`Waktu dari Datetime Sensor SNMP: ${snmpDateTime}`);
      console.log(
        `Presentasi Kekuatan dari Uptime Sensor SNMP: ${snmpUptimeStrength}%`
      );

    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = MonitoringController;
