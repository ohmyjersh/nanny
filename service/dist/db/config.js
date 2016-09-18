"use strict";
var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.DB_CONNECTION_STRING = "mongodb://localhost/incomm";
Object.seal(Config);
module.exports = Config;
//# sourceMappingURL=config.js.map