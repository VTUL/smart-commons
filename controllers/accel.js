module.exports = {
  watchForMovement: function (accelerometer, request, battery, beacon, alarm) {
    var config = require('../config.js')
    var timeSet = false
    var moment = require('moment')

    accelerometer.on('change', function () {
      var timeNow = moment()
      if (this.acceleration > config.accelSensitivity && !timeSet) {
        timeSet = moment()
        // console.log(beacon.getLocationName(beacon.closestBeacon))
        // console.log(battery.voltage)
        console.log('Accelerometer Triggered')
        request.post(config.postOptions, function (error, response, body) {
          console.log(response.statusCode)
        }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon), time_of_movement: timeSet.local().format('YYYY-MM-DD HH:mm:ss'), battery_level: battery.voltage, alarm_state: alarm.alarmState})
      } else if (timeNow.duration().subtract(timeSet).milliseconds() > config.accelBounce) {
        timeSet = false
      }
    })
  }
}
