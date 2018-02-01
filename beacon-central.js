Bleacon = require('bleacon');

var uuid = '12345678-1234-1234-1234-123456789012';
var major = 0;
var minor = 0;
var measuredPower = -59;

Bleacon.startAdvertising(uuid, major, minor, measuredPower);
Bleacon.stopAdvertising();
