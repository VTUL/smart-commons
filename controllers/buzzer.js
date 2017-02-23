var config = require('../config.js')
module.exports = {
  alarm: function (buttonLid, buttonChair, piezo, request, beacon, battery) {
    buttonLid.on('up', function () {
      console.log('Alarm will trigger if set')
      request.post(config.warningOptions, function (error, response, body) {
        console.log(response.statusCode)
      }).form({device_name: config.deviceID, current_location: beacon.getLocationName(beacon.closestBeacon)})
      piezo.frequency(config.alarmFreq, config.alarmDuration)
    })

  //  buttonChair.on('up', function() {
  //    piezo.frequency(config.alarmFreq, config.alarmDuration);
  //  });
  }
}
