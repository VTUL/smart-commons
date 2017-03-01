var Bleacon = require('bleacon')
var config = require('../config.js')

var closestBeacon = ''
var testAgainstBeacon = {major: '', count: 0}

function delayedTest (beacon) {
  if (testAgainstBeacon.count === 0) {
    testAgainstBeacon.major = beacon.major
    testAgainstBeacon.count = 1
    return false
  } else if (testAgainstBeacon.major === beacon.major) {
    if (testAgainstBeacon.count === config.beaconTestCount) {
      console.log('Beacon passed test')
      return true
    } else {
      testAgainstBeacon.count += 1
      console.log('Beacon count increased')
      return false
    }
  } else {
    testAgainstBeacon.count = 0
    console.log('Beacon failed test')
    return false
  }
}

function getProximity (beacon) {
  switch (beacon.proximity) {
    case 'immediate':
      return 4
    case 'near':
      return 3
    case 'far':
      return 2
    case 'unknown':
      return 1
    default:
      return 'Undefined proximity error.'
  }
}

module.exports = {
  closestBeacon: closestBeacon,
  getLocationName: function (beacon) {
    var name
    config.areas.forEach(function (area, index) {
      if (area['major'] === beacon.major) {
        name = area['name']
      }
    })
    return name
  },
  watchForRelocation: function (request) {
    Bleacon.startScanning(config.uuid)
    Bleacon.on('discover', function (beacon) {
      if (module.exports.closestBeacon === '') {
        module.exports.closestBeacon = beacon
      }
      if (beacon.major !== module.exports.closestBeacon.major) {
        if (getProximity(beacon) > getProximity(module.exports.closestBeacon)) {
          if (delayedTest(beacon)) {
            var location = module.exports.getLocationName(beacon)
            console.log(module.exports.getLocationName(beacon))
            var event = 'Moved from ' + module.exports.getLocationName(module.exports.closestBeacon) + ' to ' + module.exports.getLocationName(beacon)
            request.post(config.postOptions, function (error, response, body) {
              console.log(response.statusCode)
            }).form({current_location: location, type_of_relocation: event, device_name: config.deviceID, battery_level: battery.voltage, alarm_state: alarm.alarmState})
            module.exports.closestBeacon = beacon
            console.log(event)
          }
        }
      }
    })
  }
}
