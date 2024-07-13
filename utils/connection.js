const axios = require("axios");
const { handlerError } = require("../helper/HandlerError");
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: process.env.CONNECTION_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiToken = process.env.API_TOKEN;

class connectionPRTG {
  static async tableJson(param) {
    const params = {
      apitoken: apiToken,
      ...(param.content && { content: param.content }),
      ...(param.columns && { columns: param.columns }),
      ...(param.filter_device && { filter_device: param.filter_device }),
      ...(param.filter_type && { filter_type: param.filter_type }),
      ...(param.output && { output: param.output }),
      ...(param.sensor_id && { sensor_id: param.sensor_id }),
      ...(param.filter_session && { filter_session: param.filter_session }),
      ...(param.count && { count: param.count }),
      ...(param.noraw && { noraw: param.noraw }),
      ...(param.id && { id: param.id }),
      ...(param.usecaption && { usecaption: param.usecaption }),
      ...(param.filter_user && { filter_user: param.filter_user }),
      ...(param.filter_parentid && { filter_parentid: param.filter_parentid }),
    };
    // console.log(params);
    try {
      const response = await axiosInstance.get(`/api/table.json`, { params });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return {errorConnection: error.response.data};
    }
  }
  static async tableXML(param) {
    const params = {
      apitoken: apiToken,
      ...(param.content && { content: param.content }),
      ...(param.id && { id: param.id }),
    };
    try {
      const response = await axiosInstance.get(`/api/table.xml`, { params });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return { errorConnection: error.response.data };
    }
  }
  static async detailSensor(param) {
    const params = {
      apitoken: apiToken,
      ...(param.id && { id: param.id }),
    };
    try {
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
}

module.exports = connectionPRTG;
