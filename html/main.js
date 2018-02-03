var binaryArray = ["0", "1", "1", "0", "0", "0", "0", "0", "0", "1", "0", "1"]
var binaryStart = [25, 32, 49, 57, 73, 80, 83, 88, 92, 96, 99, 101, 112,120]
var binaryEnd = [31, 45, 56, 70, 75, 82, 85, 91, 94, 98, 100, 108, 116,124]
var binaryNews = ["北", "北北西", "北東", "東北東", "東", "東南東", "南東", "南南東", "南", "南南西", "南西", "西南西", "西", "西北西", "北西", "北北西"];
var binaryDirection = ["", "↑", "↗", "→", "↘", "↙", "←", "↖"]
var byteUUID
for (i = 12; i < 128; i++){
    binaryArray[i] = "0"
}
function binaryUUID(z,y) {
    var l = ""
    l = y.toString(2)
    for (i = 0; i < l.length; i++) {
        binaryArray[z-i] = l[l.length -1 -i]
    }
}
function makeUUID() {
    var UUID = ""
    for (i = 0; i < 32; i++) {
    byteUUID=""
    for (j = 0; j < 4; j++) {
        byteUUID=byteUUID+binaryArray[i*4+j]
    }
    console.log(byteUUID)
    UUID = UUID + parseInt(byteUUID, 2).toString(16)
    }
    return UUID
}
function send() {
    binaryUUID(14, Math.abs(document.getElementById('in1_direction').value))
    binaryUUID(17, Math.abs(document.getElementById('in2_direction').value))
    binaryUUID(20, Math.abs(document.getElementById('in3_direction').value))
    binaryUUID(23, Math.abs(document.getElementById('in4_direction').value))
    if (document.getElementById('in1_latitude').value < 0) {
        binaryArray[24]="1"
    }
    binaryUUID(31, Math.abs(document.getElementById('in1_latitude').value))
    binaryUUID(45, Math.abs(document.getElementById('in2_latitude').value))
    if (document.getElementById('in1_longitude').value < 0) {
        binaryArray[48] = "1"
    }
    binaryUUID(56, Math.abs(document.getElementById('in1_longitude').value))
    binaryUUID(70, Math.abs(document.getElementById('in2_longitude').value))
    if (document.getElementById('in_high').value < 0) {
        binaryArray[72] = "1"
    }
    binaryUUID(75, Math.abs(document.getElementById('in_high').value))
    binaryUUID(82, Math.abs(document.getElementById('in_total_lane').value))
    binaryUUID(85, Math.abs(document.getElementById('in_lane').value))
    binaryUUID(91, Math.abs(document.getElementById('in_news').value))
    binaryUUID(94, Math.abs(document.getElementById('in_inter').value))
    binaryUUID(98, Math.abs(document.getElementById('in_roadType').value))
    binaryUUID(100, Math.abs(document.getElementById('in_highwayType').value))
    binaryUUID(108, Math.abs(document.getElementById('in_rootNumber').value))
    binaryUUID(116, Math.abs(document.getElementById('in_maxSpeed').value)/5)
    binaryArray[117] = document.getElementById('in_unit').value
    binaryUUID(124, Math.abs(document.getElementById('in_minSpeed').value)/5)
    binaryArray[125] = document.getElementById('in_unit').value

    var uuid = makeUUID()
    fetch(location.href + "/start?uuid=" + uuid).then(()=>{
        alert("成功しました")
    }).catch(()=>{
        alert("失敗しました")
    })
}
