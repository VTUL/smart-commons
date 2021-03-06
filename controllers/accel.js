var config = require('../config.js')
var moment = require('moment')

module.exports = {
  watchForMovement: function (accelerometer, request, battery, beacon, alarm) {
    var timeSet = false

    accelerometer.on('change', function () {
      var timeNow = moment()
      if (this.acceleration > config.accelSensitivity && !timeSet) {
        timeSet = moment()
        console.log('Accelerometer Triggered')
        request.post(config.postOptions, function (error, response, body) {
          if (error) {
            console.log('Error: ' + error)
          } else {
            console.log('Accelerometer POST response: ' + response.statusCode)
          }
        }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon), time_of_movement: timeSet.utcOffset(config.timeOffset).format('YYYY-MM-DD HH:mm:ss'), battery_level: battery.voltage, alarm_state: alarm.alarmState})
      } else if (timeNow.diff(timeSet) > config.accelBounce) {
        timeSet = false
      }
    })
  }
}
