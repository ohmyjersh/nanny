"use strict";
const BaseRepository_1 = require("./BaseRepository");
const ConfigurationSchema_1 = require("../db/schema/ConfigurationSchema");
class ManifestRepository extends BaseRepository_1.default {
    constructor() {
        super(ConfigurationSchema_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ManifestRepository;
