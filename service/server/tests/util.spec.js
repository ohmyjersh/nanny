"use strict";
const chai = require("chai");
const expect = chai.expect;
const utils_1 = require("../utils/utils");
describe("util works", () => {
    it("should return true", () => {
        expect(utils_1.default.isNullOrUndefined(null)).to.be.equal(true);
    });
    it("should return true", () => {
        expect(utils_1.default.isNullOrUndefined(null)).to.be.equal(true);
    });
    it("should return false", () => {
        expect(utils_1.default.isNullOrUndefined("stuff")).to.be.equal(false);
    });
});
//# sourceMappingURL=util.spec.js.map