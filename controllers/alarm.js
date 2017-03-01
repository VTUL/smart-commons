var config = require('../config.js')
var alarmState

module.exports = {
  alarmState: alarmState,
  getAlarmStatus: function (request) {
    request.get(config.alarmURL, function (error, response, body) {
      console.log('Alarm GET response: ' + response.statusCode)
      var data = JSON.parse(body)
      data[config.deviceID] === 1 ? module.exports.alarmState = true : module.exports.alarmState = false
      console.log('New alarmState: ' + module.exports.alarmState)
      console.log(data[config.deviceID])
      return module.exports.alarmState
    })
  }
}
