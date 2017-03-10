var config = require('../config.js')
var alarmState

module.exports = {
  alarmState: alarmState,
  getAlarmStatus: function (request) {
    request.get(config.alarmURL, function (error, response, body) {
      if (error) {
        console.log('Error: ' + error)
      } else {
        console.log('Alarm GET response: ' + response.statusCode)
      }
      var data = JSON.parse(body)
      data[0][config.deviceID] === '1' ? module.exports.alarmState = true : module.exports.alarmState = false
      console.log('New alarmState: ' + module.exports.alarmState)
      return module.exports.alarmState
    })
  }
}
