var voltage = "";
module.exports = {
  voltage: voltage,
  getBatteryLevel: function(batteryVoltage) {
    batteryVoltage.on('change', function(value) {
      module.exports.voltage = value.toFixed(2) + 'V';
      return module.exports.voltage;
    });
  }
}