var express = require('express');
var cors = require('cors');
var app = express();


var whitelist = ['http://localhost:3443/', 'http://localhost:3000/','http://192.168.252.1:3443'];

var corsOptionsDelegate = (req,callback) =>{
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = {origin: true};
    }
    else{
        corsOptions = {origin:false};
    }
    callback(null,corsOptions);
};


exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);

