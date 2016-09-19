"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const configuration_1 = require("../models/configuration");
class ConfigurationHandler {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield configuration_1.Configuration.create({ thing: "thing" });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigurationHandler;
//# sourceMappingURL=configuration.js.map