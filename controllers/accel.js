module.exports = {
  watchForMovement: function(accelerometer,request,battery,beacon) {
    var config = require('../config.js');
    var timeSet = false;

    accelerometer.on("change", function() {
      var timeNow = new Date();
      if(this.acceleration > config.accelSensitivity && !timeSet) {
        timeSet = new Date();
        console.log(beacon.getLocationName(beacon.closestBeacon));
        console.log(battery.voltage);
        console.log("Send Data!");
        //request.post(config.postURL, function(error, response, body) {
          //        console.log(response.statusCode);
          //}).form({device_id:config.deviceID, current_location:beacon.getLocationName(beacon.closestBeacon), movement_time:timeSet, battery_level:battery.voltage, alarm_state:alarm_state});
      } else if (timeNow - timeSet > config.accelBounce) {
        timeSet = false;
      }
    }); 
  }
}