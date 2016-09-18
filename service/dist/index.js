"use strict";
var express = require("express");
var app_1 = require("./app");
var port = 5001; //or from a configuration file
var api = new app_1.NannyApi(express(), port);
api.run();
console.info("listening on " + port);
//# sourceMappingURL=index.js.map