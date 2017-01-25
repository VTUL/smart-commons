module.exports = {
  alarm: function(buttonLid,buttonChair,piezo,request,beacon,battery) {
    var config = require('../config.js');
    
    buttonLid.on('up', function() {
      console.log("Alarm will trigger if set");
      //request.post(config.alarmURL, function(error, response, body) {
        //        console.log(response.statusCode);
        //}).form({device_id:config.deviceID, current_location:beacon.getLocationName(beacon.closestBeacon), movement_time:timeSet, battery_level:battery.voltage, alarm_state:alarm_state});
      piezo.frequency(config.alarmFreq, config.alarmDuration);
    });

  //  buttonChair.on('up', function() {
  //    piezo.frequency(config.alarmFreq, config.alarmDuration);
  //  });
  }
}