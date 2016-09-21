"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const manifest_1 = require("../models/manifest");
class ManifestHandler {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manifest_1.Manifest.create({ thing: "thing" });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manifest_1.Manifest.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manifest_1.Manifest.findById(id);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manifest_1.Manifest.findOne({ name: name });
        });
    }
    update(id, manifest) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manifest_1.Manifest.findByIdAndUpdate(id, manifest);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manifest_1.Manifest.findByIdAndRemove(id);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ManifestHandler;
//# sourceMappingURL=manifest.js.map