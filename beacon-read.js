
var binaryArray = []
var binaryStart = [25, 32, 49, 57, 73, 80, 83, 88, 92, 96, 99, 101, 112, 120]
var binaryEnd = [31, 45, 56, 70, 75, 82, 85, 91, 94, 98, 100, 108, 116, 124]
var binaryNews = ["北", "北北西", "北東", "東北東", "東", "東南東", "南東", "南南東", "南", "南南西", "南西", "西南西", "西", "西北西", "北西", "北北西"]
var binaryDirection = ["", "↑", "↗", "→", "↘", "↙", "←", "↖"]


function readUUID(uuid) {
    //変数定義
    var latitude = "" //緯度
    var longitude = "" //経度
    var high = "" //高さ
    var total_lane = "" //総車線数
    var lane = "" //車線
    var news = "向かっている方角は" //方角
    var inter = "" //交差点
    var roadName = "" //下の３つを収める
    var roadType = "" //高速3,国道2,都道府県道1,一般道0
    var highwayType = "" //普通E→1,環状C→0
    var rootNumber = ""
    var maxSpeed = ""
    var minSpeed = ""
    //km/h,mile/h
    var unit = ""
    var direction = "" //進行方向, 専用レーン


    // bitごとの配列が入る
    binaryArray = changeTwoBitsArray(uuid)

    //緯度
    if (binaryArray[24] == "1") {
        //南緯
        latitude = "-" + decodeUUID(0) + "." + decodeUUID(1)
    } else {
        //北緯
        latitude = decodeUUID(0) + "." + decodeUUID(1)
    }

    //経度
    if (binaryArray[48] == "1") {
        //西経
        longitude = "-" + decodeUUID(2) + "." + decodeUUID(3)
    } else {
        //東経
        longitude = decodeUUID(2) + "." + decodeUUID(3)
    }

    //高さレベル
    high = decodeUUID(4)

    //車線
    lane = decodeUUID(6)
    total_lane = decodeUUID(5)

    //方角
    var newsNumber = decodeUUID(7);
    news = binaryNews[newsNumber]

    //交差点までの距離
    inter = decodeUUID(8);

    /*
    if (inter == 7){
        inter = "この先しばらく交差点はありません"
    }else {
        inter = "次の交差点までの距離は7段階中 "+ inter + "です"
    }*/

    //道路種別と番号
    roadType = decodeUUID(9);
    if (roadType == 3) {
        roadName = "高速道路"
        highwayType = decodeUUID(10);
        if (highwayType == 1) {
            roadName = roadName + "E"
        } else if (highwayType == 0) {
            roadName = roadName + "C"
        }
    } else if (roadType == 2) {
        roadName = "国道"
    } else if (roadType == 1) {
        roadName = "都道府県道"
    } else if (roadType == 0) {
        roadName = "市区町村道"
    }
    rootNumber = decodeUUID(11);
    roadName = roadName + rootNumber + "号線"

    //最高速度
    maxSpeed 　= decodeUUID(12)*5;
    
    //最低速度
    minSpeed 　= decodeUUID(13)*5;

    //単位
    var i = binaryArray[117]
    if (i = 1) {
        unit = "km/h"
    } else if (i = 0) {
        unit = "mi/h"
    }

    //進行方向制限
    directionNumber=0


    var properties = {
        direction: direction,
        latitude: latitude,
        longitude: longitude,
        high: high,
        total_lane: total_lane,
        lane: lane,
        news: news,
        inter: inter,
        roadName: roadName,
        roadType: roadType,
        highwayType: highwayType,
        rootNumber: rootNumber,
        maxSpeed: maxSpeed,
        minSpeed: minSpeed,
        unit: unit,


    }

    return properties
}





function decodeUUID(x) {
    var l = ""
    for (i = binaryStart[x]; i <= binaryEnd[x]; i++) {
        l = l + binaryArray[i]
    }
    var y = parseInt(l, 2)
    return y
}

function changeTwoBitsArray(uuid) {
    var uuidTwoBits = []
    var splitByFourBit = []
    splitByFourBit = splitByLength(uuid, 2)
    for (let fourBit of splitByFourBit) {
        // hexごとにfour文を回す。e.g) FF,11,22... というようにはいる
        var bin = hex2bin(fourBit)

        //一文字ずつ回して配列にぶち込む
        for (let bit of bin) {
            uuidTwoBits.push(bit)
        }
    }
    return uuidTwoBits
}

function hex2bin(hex) {
    // 16進数をhexごとに２進数にする
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
}

function splitByLength(str, length) {
    var resultArr = [];
    if (!str || !length || length < 1) {
        return resultArr;
    }
    var index = 0;
    var start = index;
    var end = start + length;
    while (start < str.length) {
        resultArr[index] = str.substring(start, end);
        index++;
        start = end;
        end = start + length;
    }
    return resultArr;
}




//使用する関数のexport
module.exports =  readUUID;
//以下デバッグ用
/*
var result = readUUID("6052490B115C3788AE10241228010C0C")
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
*/