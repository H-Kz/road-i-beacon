function serch(x){
 Bleacon = require('bleacon');
 Bleacon.startScanning(x);
}

Bleacon.on('discover', function(bleacon) {
   console.dir(bleacon);
;});