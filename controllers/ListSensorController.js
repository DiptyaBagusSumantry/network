const Models = require("../models/index.js");
const { handlerError, handleGet } = require("../helper/HandlerError.js");

class ListSensorController {
  static async getListSensorById(req, res) {
    try {
      await Models.ListSensor.findOne({
        where: {
          filter_parentid: req.query.id,
        },
        attributes: ['id','sensor']
      }).then((data) => {
        handleGet(res, data);
      }).catch(error=>{
        handlerError(res, error);
      })
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = ListSensorController;
