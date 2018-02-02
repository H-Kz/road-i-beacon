var Bleacon = require('bleacon');
var express = require("express");
var app = express();

//マジックナンバー
var PORT = 80

//

//静的ファイルで待ち受け
app.use(express.static("html"))

app.get("/start",function (req,res){
    res.send("startしたで")
})
app.get("/stop",function (req,res){
    res.send("stopしたで")
})

app.listen(80,()=>{
    console.log("[EXPRESS] Webserver Listening. :" + PORT )
})

/*
var uuid = '11451419198103643641145141919810';
var major = 0;
var minor = 0;
var measuredPower = -59;

Bleacon.startAdvertising(uuid, major, minor, measuredPower);

var export_function = require('beacon-read.js');
export_function.readUUID; 
*/