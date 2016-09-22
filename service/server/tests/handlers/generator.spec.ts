import * as chai from "chai";
const expect = chai.expect;
import GeneratorHandler from '../../handlers/generator';
let generatorHandler = new GeneratorHandler();
describe("Generator Handler", ()=> {
    it('should flatten', ()=> {
        let configurations = {
                configurations:{
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