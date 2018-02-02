var byteUUID
var binaryArray = ["0", "1", "1", "0", "0", "0", "0", "0", "0", "1", "0", "1"]
for (i = 12; i < 128; i++) {
    binaryArray[i] = "0"
}
function binaryUUID(z, y) {
    var l = ""
    l = y.toString(2)
    for (i = 0; i < l.length; i++) {
        binaryArray[z - i] = l[l.length - 1 - i]
    }
}
function makeUUID() {
    var UUID = ""
    for (i = 0; i < 32; i++) {
        byteUUID = ""
        for (j = 0; j < 4; j++) {
            byteUUID = byteUUID + binaryArray[i * 4 + j]
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
        binaryArray[24] = "1"
    }
    binaryUUID(31, Math.abs(document.getElementById('in1_latitude').value))
    binaryUUID(45, Math.abs(document.getElementById('in2_latitude').value))
    if (document.getElementById('in1_longitude').value < 0) {
        binaryArray[48] = "1"
    }
    binaryUUID(56, Math.abs(document.getElementById('in1_longitude').value))
    binaryUUID(70, Math.abs(document.getElementById('in1_longitude').value))
    if (document.getElementById('in1_longitude').value < 0) {
        binaryArray[72] = "1"
    }
    binaryUUID(82, Math.abs(document.getElementById('in_high').value))
    binaryUUID(85, Math.abs(document.getElementById('in_total_lane').value))
    binaryUUID(91, Math.abs(document.getElementById('in_lane').value))
    binaryUUID(94, Math.abs(document.getElementById('in_news').value))
    binaryUUID(98, Math.abs(document.getElementById('in_roadType').value))
    binaryUUID(100, Math.abs(document.getElementById('in_highwayType').value))
    binaryUUID(108, Math.abs(document.getElementById('in_rootNumber').value))
    binaryUUID(116, Math.abs(document.getElementById('in_maxSpeed').value))
    binaryArray[117] = document.getElementById('in_unit').value
    binaryUUID(124, Math.abs(document.getElementById('in_minSpeed').value))
    binaryArray[125] = document.getElementById('in_unit').value
    
    //生成したUUID
    var uuid = makeUUID()
    fetch(location.href + "start?uuid=" + uuid).then(()=>{
        alert("送信に成功しました")
    }).catch(()=>{
        alert("失敗")
    })
}
