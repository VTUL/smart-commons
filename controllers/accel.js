module.exports = {
  watchForMovement: function (accelerometer, request, battery, beacon, alarm) {
    var config = require('../config.js')
    var timeSet = false
    var moment = require('moment')

    accelerometer.on('change', function () {
      var timeNow = moment().utcOffset(-5).format('YYYY-MM-DD HH:mm:ss')
      if (this.acceleration > config.accelSensitivity && !timeSet) {
        timeSet = moment().utcOffset(-5).format('YYYY-MM-DD HH:mm:ss')
        // console.log(beacon.getLocationName(beacon.closestBeacon))
        // console.log(battery.voltage)
        console.log('Accelerometer Triggered')
        request.post(config.postOptions, function (error, response, body) {
          console.log(response.statusCode)
        }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon), time_of_movement: timeSet, battery_level: battery.voltage, alarm_state: alarm.alarmState})
      } else if (moment.valueOf(timeNow) - moment.valueOf(timeSet) > config.accelBounce) {
        timeSet = false
      }
    })
  }
}
