module.exports = {
  watchForMovement: function (accelerometer, request, battery, beacon, alarm) {
    var config = require('../config.js')
    var timeSet = false

    accelerometer.on('change', function () {
      var timeNow = new Date()
      if (this.acceleration > config.accelSensitivity && !timeSet) {
        timeSet = new Date()
        // console.log(beacon.getLocationName(beacon.closestBeacon))
        // console.log(battery.voltage)
        console.log('Accelerometer Triggered')
        request.post(config.postOptions, function (error, response, body) {
          console.log(response.statusCode)
        }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon), time_of_movement: timeSet.toISOString().slice(0, 19).replace('T', ' '), battery_level: battery.voltage, alarm_state: alarm.alarmState})
      } else if (timeNow - timeSet > config.accelBounce) {
        timeSet = false
      }
    })
  }
}
