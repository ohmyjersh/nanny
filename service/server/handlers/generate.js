"use strict";
const configuration_1 = require("../models/configuration");
const manifest_1 = require("../models/manifest");
class Generate {
    configurations(request) {
        var manifest = manifest_1.Manifest.findByName(request.manifest.name);
        request.configurations.forEach((x) => {
            var result = configuration_1.Configuration.findAllByName(x);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Generate;
//# sourceMappingURL=generate.js.map