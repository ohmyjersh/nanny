"use strict";
const express = require('express');
const app_1 = require('./app');
let port = 5001; //or from a configuration file
let api = new app_1.NannyApi(express(), port);
api.run();
console.info(`listening on ${port}`);
