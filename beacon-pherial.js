var Bleacon = require('bleacon');
var readUUID = require("./beacon-read")



Bleacon.startScanning();








Bleacon.on('discover', function (bleacon) {
    var uuid = bleacon.uuid;
    var proximity = bleacon.proximity;
    console.log("[DISCOVER] UUID:" + uuid)
    console.log("[DISCOVER] distance:" + proximity)


    //識別子確認
    if (uuid.substring(0, 3) == "605") {
        //readを動かす。
        var result = readUUID(bleacon.uuid)
        console.log(`進行方向:${result.direction}`)
        console.log(`緯度:${result.latitude}`)
        console.log(`経度:${result.longitude}`)
        console.log(`高さ:${result.high}`)
        console.log(`車線数:${result.lane}`)
        console.log(`方角:${result.news}`)
        console.log(`交差点までの距離:${result.inter}`)
        console.log(`道路名:${result.roadName}`)
        console.log(`道路種別:${result.roadType}`)
        console.log(`高速道路タイプ:${result.highwayType}`)
        console.log(`道路番号:${result.rootNumber}`)
        console.log(`最高速度:${result.maxSpeed}`)
        console.log(`最低速度:${result.minSpeed}`)
        console.log(`速度単位:${result.unit}`)

    }
});


