import * as chai from "chai";
import * as sinon from "sinon";
const expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
import ConfigurationHandler from "../../handlers/configuration"
const configurationHandler = new ConfigurationHandler();
 var thing = sinon.createStubInstance(configurationHandler);

