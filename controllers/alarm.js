var config = require('../config.js')
var alarmState
module.exports = {
  alarmState: alarmState,
  getAlarmStatus: function (request) {
    request.get(config.alarmURL, function (error, response, body) {
      console.log(response.statusCode)
      var data = JSON.parse(body)
      data[config.deviceID] === 1 ? module.exports.alarmState = true : module.exports.alarmState = false
      return module.exports.alarmState
    })
  }
}
