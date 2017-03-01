var config = require('../config.js')
var moment = require('moment')

module.exports = {
  watchForFSR: function (fsr, request, beacon, battery, alarm) {
    var timeSat = false

    fsr.on('change', function (value) {
      if (value === 1) {
        timeSat = moment()
      } else if (value === 0 && timeSat) {
        var timeStood = moment()
        var duration = moment.duration(timeNow.diff(timeSet)).asMilliseconds()
        console.log(duration)
        alarm.getAlarmStatus(request)
        if (duration > 10000) {
          request.post(config.postOptions, function (error, response, body) {
            console.log(response.statusCode)
          }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon), time_sat_down: timeSat.utcOffset(config.timeOffset).format('YYYY-MM-DD HH:mm:ss'), time_stood_up: timeStood.utcOffset(config.timeOffset).format('YYYY-MM-DD HH:mm:ss'), duration_of_sit: duration, battery_level: battery.voltage, alarm_state: alarm.alarmState})
          console.log('FSR triggered')
        }
        timeSat = false
      }
    })
  }
}
