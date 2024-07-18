const Models = require("../models/index.js");
const { handlerError, handleGet } = require("../helper/HandlerError.js");

class ListDeviceController {
  static async getDevice(req, res) {
    try {
      await Models.ListDevice.findAll().then((data) => {
        const result = data.reduce((accumulator, element) => {
          const devices = JSON.parse(element.dataValues.devices);
          return accumulator.concat(devices);
        }, []);

        handleGet(res, result);
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getGroupId(req, res) {
    try {
      await Models.ListDevice.findAll({ attributes: ["filter_parentid"] }).then(
        (data) => {
          handleGet(res, data);
        }
      );
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = ListDeviceController;
