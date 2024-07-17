const axios = require("axios");
require("dotenv").config();

const axiosInstance = axios.create({
//   baseURL: process.env.CONNECTION_URL,
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

// const apiToken = process.env.API_TOKEN;
const apiToken = "";

async function getDevicesInGroup(groupId) {
  try {
    const params = "";
    const response = await axiosInstance.get(`/api/table.json`, { params });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return { errorConnection: error.response.data };
  }
}

async function getSensorsForDevice(deviceId) {
  try {
    const params = "";
    const response = await axiosInstance.get(`/api/table.json`, { params });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return { errorConnection: error.response.data };
  }
}

async function getSensorSpeeds(sensorId) {
  try {
    const params = "";
    const response = await axiosInstance.get(`/api/table.json`, { params });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return { errorConnection: error.response.data };
  }
}

async function getSensorDetails(sensorId) {
  try {
    const params = "";
    const response = await axiosInstance.get(`/api/getsensordetails.json`, {
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
    const allDevices = [];
    for (const groupId of groupIds) {
      const devices = await getDevicesInGroup(groupId);
      console.log("Devices for Group ${groupId}:", devices);

      allDevices.push(devices);

      for (const device of devices) {
        const deviceId = device.deviceId;

        const sensors = await getSensorsForDevice(deviceId);
        console.log("Sensors for Device ${deviceId}:", sensors);

        for (const sensor of sensors) {
          const sensorId = sensor.sensorId;

          const sensorDetails = await getSensorDetails(sensorId);
          console.log("Details for Sensor ${sensorId}:", sensorDetails);

          const sensorSpeeds = await getSensorSpeeds(sensorId);
          console.log("Speeds for Sensor ${sensorId}:", sensorSpeeds);
        }
      }
    }

    console.log("All Devices:", allDevices);
  } catch (error) {
    console.error("Main process error:", error);
  }
}

const groupIds = ["group1", "group2", "group3"];
main(groupIds);
