var config = require('../config.js')

module.exports = {
  watchForFSR: function (fsr, request, beacon, battery, alarm) {
    var timeSat = false

    fsr.on('change', function (value) {
      if (value === 1) {
        timeSat = Date.now()
      } else if (value === 0 && timeSat) {
        var timeStood = Date.now()
        var duration = timeStood - timeSat
        alarm.getAlarmStatus(request)
        if (duration > 10000) {
          request.post(config.postURL, function (error, response, body) {
            console.log(response.statusCode)
          }).form({device_id: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon), time_sat_down: timeSat, time_stood_up: timeStood, duration_of_sit: duration, battery_level: battery.voltage, alarm_state: alarm_state})
          console.log('FSR triggered')
        }
        timeSat = false
      }
    })
  }
}
