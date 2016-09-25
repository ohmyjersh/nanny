import * as chai from "chai";
const expect = chai.expect;
import GeneratorHandler from '../../handlers/generator';
let generatorHandler = new GeneratorHandler();
describe("Generator Handler", ()=> {
    it('should flatten', ()=> {
        let configurations = {
                sites: { 
                    apiHost: "http://qa-api.site.com",
                    Google: "http://google.com"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                }
            };
        expect(generatorHandler.flattenConfigurations(configurations)).to.be.eql({
                apiHost: "http://qa-api.site.com",
                Google: "http://google.com",
                twitter: "http://twitter.com/api",
                facebook: "http://facebook.com/api"
        });
    });
    it('should transform the template', () => {
        expect(generatorHandler
                .transformConfigData("this will be transformed {lol}", {lol:"butts"}))
                .to.be.eql("this will be transformed butts");
    });
    it('should merge config result set over manifest result set', () => {
        var manifesetResult = {
            sites: {
                apiHost: "http://prod-api.site.com",
                Google: "https://google.com/"
            },
            integration: {
                twitter: "https://twitter.com/api",
                facebook: "https://facebook.com/api"               
            }
        };
        var configResult = {
                sites: { 
                    apiHost: "http://qa-api.site.com",
                    Google: "http://google.com/"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                },
                payment: {
                    stripeApi: "http://api.stripe.com"
                }
            };
        expect(generatorHandler.mergeManifestAndConfig(manifesetResult,configResult,false)).to.be.eql({
                sites: { 
                    apiHost: "http://qa-api.site.com",
                    Google: "http://google.com/"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                },
                payment: {
                    stripeApi: "http://api.stripe.com"
                }
        });
    });
    it('should merge manifest result set over config result set', () => {
        var manifesetResult = {
            sites: {
                apiHost: "http://prod-api.site.com",
                Google: "https://google.com/"
            },
            integration: {
                twitter: "https://twitter.com/api",
                facebook: "https://facebook.com/api"               
            }
        };
        var configResult = {
                sites: { 
                    apiHost: "http://qa-api.site.com",
                    Google: "http://google.com/"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                },
                payment: {
                    stripeApi: "http://api.stripe.com"
                }
            };
        expect(generatorHandler.mergeManifestAndConfig(manifesetResult,configResult,true)).to.be.eql({
            sites: {
                apiHost: "http://prod-api.site.com",
                Google: "https://google.com/"
            },
            integration: {
                twitter: "https://twitter.com/api",
                facebook: "https://facebook.com/api"               
            },
            payment: {
                stripeApi: "http://api.stripe.com"
            }
        });
    });
});