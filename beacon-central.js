var Bleacon = require('bleacon');
var express = require("express");
var app = express();

//マジックナンバー
var PORT = 80

//静的ファイルで待ち受け
app.use(express.static("html"))
//startをGETで受け取る
app.get("/start",function (req,res){
    //uuidはqueryに入ってる。
    var uuid = req.query.uuid;
    var major = 0;
    var minor = 0;
    var measuredPower = -59;
    Bleacon.startAdvertising(uuid, major, minor, measuredPower);
    console.log(`UUID:${uuid}`)
    res.send("startしたで")
})
//stopをGETで受け取る
app.get("/stop",function (req,res){
    Bleacon.stopAdvertising()
    res.send("stopしたで")
})

app.listen(80,()=>{
    console.log("[EXPRESS] Webserver Listening. :" + PORT )
})