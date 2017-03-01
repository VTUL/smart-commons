var config = require('../config.js')

module.exports = {
  watchForFSR: function (fsr, request, beacon, battery, alarm) {
    var timeSat = false

    fsr.on('change', function (value) {
      if (value === 1) {
        timeSat = new Date()
      } else if (value === 0 && timeSat) {
        var timeStood = new Date()
        var duration = timeStood.getTime() - timeSat.getTime()
        console.log(duration)
        alarm.getAlarmStatus(request)
        if (duration > 10000) {
          request.post(config.postOptions, function (error, response, body) {
            console.log(response.statusCode)
          }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon), time_sat_down: timeSat.toISOString().slice(0, 19).replace('T', ' '), time_stood_up: timeStood.toISOString().slice(0, 19).replace('T', ' '), duration_of_sit: duration, battery_level: battery.voltage, alarm_state: alarm.alarmState})
          console.log('FSR triggered')
        }
        timeSat = false
      }
    })
  }
}
