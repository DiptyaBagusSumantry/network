const Models = require("../models/index.js");
const { handlerError, handleGet } = require("../helper/HandlerError.js");

class DashboardController {
  static async countDashboard(req, res) {
    try {
      let countRouter = 0;
      let countAksesPoin = 0;
      let countUserTerhubung = 0;

      await Models.ListDevice.findAll().then((data) => {
        data.forEach((item) => {
            const parse = JSON.parse(item.dataValues.devices);
            countRouter += parse.length;
        });
 
      });

      handleGet(res, { countRouter, countAksesPoin, countUserTerhubung });
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = DashboardController;
