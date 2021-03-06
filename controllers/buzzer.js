var config = require('../config.js')

module.exports = {
  alarm: function (buttonLid, piezo, request, beacon, battery, alarm) {
    buttonLid.on('up', function () {
      if (alarm.alarmState) {
        console.log('Alarm triggered!')
        request.post(config.warningOptions, function (error, response, body) {
          if (error) {
            console.log('Error: ' + error)
          } else {
            console.log('Warning POST response: ' + response.statusCode)
          }
        }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon)})
        piezo.frequency(config.alarmFreq, config.alarmDuration)
      } else {
        console.log('Alarm not set')
      }
    })
  }
}
