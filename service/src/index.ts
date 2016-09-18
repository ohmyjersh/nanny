import express = require('express');
import { NannyApi } from './app';

let port = 5001; //or from a configuration file
let api = new NannyApi(express(), port);
api.run();
console.info(`listening on ${port}`);