"use strict";
const chai = require("chai");
const expect = chai.expect;
const generator_1 = require("../../handlers/generator");
let generatorHandler = new generator_1.default();
describe("Generator Handler", () => {
    it('should flatten', () => {
        let configurations = {
            configurations: {
                sites: {
                    apiHost: "http://qa-api.site.com",
                    Things: "stuff"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                }
            }
        };
        expect(generatorHandler.flattenConfigurations(configurations)).to.be.equal({
            apiHost: "http://qa-api.site.com",
            Things: "stuff",
            twitter: "http://twitter.com/api",
            facebook: "http://facebook.com/api"
        });
    });
});
//# sourceMappingURL=generator.spec.js.map