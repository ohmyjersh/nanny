"use strict";
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const configuration_1 = require("../../handlers/configuration");
const configurationHandler = new configuration_1.default();
var thing = sinon.createStubInstance(configurationHandler);
//# sourceMappingURL=configuration.spec.js.map