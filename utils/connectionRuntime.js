const axios = require("axios");
require("dotenv").config();
const Models = require("../models/index.js");
const moment = require("moment");

const axiosInstance = axios.create({
  baseURL: process.env.CONNECTION_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiToken = process.env.API_TOKEN;

async function getDevicesInGroup(groupId) {
  try {
    const params = {
      content: "devices",
      usecaption: "true",
      filter_parentid: groupId,
      columns: "objid,device",
      apitoken: apiToken,
    };

    const response = await axiosInstance.get(`/api/table.json`, { params });
    return response.data;
  } catch (error) {
    console.log("error listdevice");
    return { errorConnection: error.response.data };
  }
}

async function getSensorsForDevice(deviceId) {
  try {
    const params = {
      content: "sensor",
      columns: "objid,sensor",
      usecaption: "true",
      filter_parentid: deviceId,
      apitoken: apiToken,
    };

    const response = await axiosInstance.get(`/api/table.json`, { params });
    return response.data;
  } catch (error) {
    console.log("getSensorsForDevice");
    return { errorConnection: error.response.data };
  }
}

async function getSensorSpeeds(sensorId) {
  try {
    const params = {
      content: "values",
      columns: "datetime,value_,coverage",
      output: "json",
      apitoken: apiToken,
      noraw: "1",
      id: sensorId,
      usecaption: "true",
      count: "5000",
    };
    const response = await axiosInstance.get(`/api/table.json`, { params });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("getSensorSpeeds");
    return { errorConnection: error.response.data };
  }
}

async function getSensorDetails(sensorId) {
  try {
    const params = {
      id: sensorId,
      usecaption: "true",
      apitoken: apiToken,
    };

    const response = await axiosInstance.get(`/api/getsensordetails.json`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log("getSensorDetails");
    return { errorConnection: error.response.data };
  }
}

async function truncateTables() {
  try {
    await Models.ListDevice.truncate();
    await Models.ListSensor.truncate();
    await Models.DetailSensor.truncate();
    await Models.DataValues.truncate();
    console.log("All tables truncated successfully.");
  } catch (error) {
    console.error("Error truncating tables:", error);
  }
}

async function getSVG(sensorId) {
  const params = {
    apitoken: apiToken,
    type: "graph",
    id: sensorId,
    graphid: 0,
    graphstyling: "showLegend%3D%271%27+baseFontSize%3D%275%27",
    width: 850,
    height: 270,
  };
  try {
    const response = await axiosInstance.get(`/chart.svg`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return { errorConnection: error.response.data };
  }
}

async function getCsv(sensorId, sdate, edate) {
  const params = {
    apitoken: apiToken,
    id: sensorId,
    avg: 3600,
    sdate,
    edate,
    usecaption: 1,
  };
  try {
    const response = await axiosInstance.get(`/api/historicdata.csv`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return { errorConnection: error.response.data };
  }
}

async function getHtml(sensorId, sdate, edate) {
  const params = {
    apitoken: apiToken,
    id: sensorId,
    avg: 3600,
    sdate,
    edate,
    pctavg: param.pctavg,
    pctshow: false,
    pct: 95,
    pctmode: false,
    hide: NaN,
  };
  try {
    const response = await axiosInstance.get(`/historicdata_html.htm`, {
      params,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return { errorConnection: error.response.data };
  }
}

async function main(groupIds) {
  try {
    const sdate = moment()
      .subtract(7, "days")
      .format("YYYY-MM-DD-00-00-00");
    const edate = moment().format("YYYY-MM-DD-00-00-00");

    await truncateTables();
    
    for (const groupId of groupIds) {
      const devices = await getDevicesInGroup(groupId);
      // console.log("Devices for Group ${groupId}:", devices);
      await Models.ListDevice.create({
        prtg_version: devices["prtg-version"],
        treesize: devices.treesize,
        devices: JSON.stringify(devices.devices),
        filter_parentid: groupId,
      });

      for (const device of devices.devices) {
        const deviceId = device.objid;

        const sensors = await getSensorsForDevice(deviceId);
        // console.log("Sensors for Device ${deviceId}:", sensors);
        await Models.ListSensor.create({
          prtg_version: sensors["prtg-version"],
          treesize: sensors.treesize,
          sensor: JSON.stringify(sensors.sensor),
          filter_parentid: deviceId,
        });

        for (const sensor of sensors.sensor) {
          const sensorId = sensor.objid;

          const svg = await getSVG(sensorId);
          const csv = await getCsv(sensorId, sdate, edate);
          const html = await getHtml(sensorId, sdate, edate);

          const sensorDetails = await getSensorDetails(sensorId);
          // console.log("Details for Sensor ${sensorId}:", sensorDetails);
          await Models.DetailSensor.create({
            prtg_version: sensorDetails.prtgversion,
            sensordata: JSON.stringify(sensorDetails.sensordata),
            sensorId,
            deviceId: groupId,
            svg: JSON.stringify(svg),
            csv: JSON.stringify(csv),
            html: JSON.stringify(html),
          });

          const sensorSpeeds = await getSensorSpeeds(sensorId);
          // console.log("Speeds for Sensor ${sensorId}:", sensorSpeeds.values.length);
          const lastValue = sensorSpeeds.values[sensorSpeeds.values.length - 1];
          await Models.DataValues.create({
            prtg_version: sensorSpeeds.prtgversion,
            treesize: sensorSpeeds.treesize,
            values: JSON.stringify(lastValue),
            sensorId,
          });
        }
      }
    }
  } catch (error) {
    console.error("Main process error:", error);
  }
}

module.exports = { main };
