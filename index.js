var request = require('request')
var five = require('johnny-five')
var chipio = require('chip-io')
var config = require('./config.js')
var accel = require('./controllers/accel.js')
var buzzer = require('./controllers/buzzer.js')
var fsr = require('./controllers/fsr.js')
var beacon = require('./controllers/beacon.js')
var battery = require('./controllers/battery.js')
var alarm = require('./controllers/alarm.js')

var board = new five.Board({
  io: new chipio()
})

board.on('ready', function () {
  // set default alarm state
  alarm.alarmState = config.alarmDefault
  // configure and activate sensors
  var accelerometer = new five.Accelerometer({
    controller: config.accelController,
    freq: 3000
  })

  var fsrInit = new five.Sensor({
    pin: config.fsrPin,
    type: 'digital'
  })

  var piezo = new five.Piezo(config.piezoPin)
  var buttonLid = new five.Button(config.buttonLidPin)
  var buttonChair = new five.Button(config.buttonChairPin)

  var batteryVoltage = new chipio.BatteryVoltage()

  // call watchdogs for each sensor
  battery.getBatteryLevel(batteryVoltage)
  beacon.watchForRelocation(request)
  accel.watchForMovement(accelerometer, request, battery, beacon)
  buzzer.alarm(buttonLid, buttonChair, piezo, request, beacon, battery)
  fsr.watchForFSR(fsrInit, request, beacon, battery, alarm)
})
