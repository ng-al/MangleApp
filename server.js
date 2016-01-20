// Copyright (c) Alvin Pivowar 2015, 2016

"use strict";

var PUBLIC_FOLDER = "./public";
var INDEX_PAGE = "./public/index.html";

var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var less = require("less-middleware");
var morgan = require("morgan");
var path = require("path");

var port = process.env.PORT || "3000";

// express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(less(path.join(__dirname, PUBLIC_FOLDER)));
app.use(express.static(path.join(__dirname, PUBLIC_FOLDER)));
app.use(morgan("combined"));

app.get("/", function(req, res){
    res.render(INDEX_PAGE);
});

//app.get("*", function(req, res, next){
//    next();
//});

app.use(function(req, res, next){
    res.status(404);
    res.send("<h1>Not Found</h1><h2>404</h2>");
});


// server
var server = http.createServer(app);
server.listen(port);
console.log("node.js server listening on port " + port);