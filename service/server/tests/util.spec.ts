import * as chai from "chai";
const expect = chai.expect;
import Util from "../utils/utils";

describe("util works", () =>{
    it("should return true", () =>{
        expect(Util.isNullOrUndefined(null)).to.be.equal(true);
    })
    it("should return true", () =>{
        expect(Util.isNullOrUndefined(null)).to.be.equal(true);
    })
    it("should return false", () =>{
        expect(Util.isNullOrUndefined("stuff")).to.be.equal(false);
    })
})