const { handleGet, handlerError } = require("../helper/HandlerError");
const connectionPRTG = require("../utils/connection");

class ResponseController {
  static async tableJson(req, res) {
    const data = await connectionPRTG.tableJson(req.params);
    if(data.errorConnection){
        handlerError( res, data)
    }
    handleGet(res, data);
  }
  static async tableXML(req, res) {
    const data = await connectionPRTG.tableXML(req.params);
    if(data.errorConnection){
        handlerError( res, data)
    }
    handleGet(res, data);
  }
  static async detailSensor(req, res) {
    const data = await connectionPRTG.detailSensor(req.params);
    if(data.errorConnection){
        handlerError( res, data)
    }
    handleGet(res, data);
  }
}
module.exports = ResponseController;
