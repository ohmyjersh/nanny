import * as chai from "chai";
const expect = chai.expect;
import GeneratorHandler from '../../handlers/generator';
var generatorHandler;
var configResult;
var manifestResult;

beforeEach(function () {
    generatorHandler = new GeneratorHandler();
    configResult =
        {
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
    manifestResult =
        {
            sites: {
                apiHost: "http://prod-api.site.com",
                Google: "https://google.com/"
            },
            integration: {
                twitter: "https://twitter.com/api",
                facebook: "https://facebook.com/api"
            }
        };
});



describe("Generator Handler", () => {
    it('should flatten', () => {
        expect(generatorHandler.flattenConfigurations(configResult)).to.be.eql({
            apiHost: "http://qa-api.site.com",
            Google: "http://google.com/",
            twitter: "http://twitter.com/api",
            facebook: "http://facebook.com/api",
            stripeApi: "http://api.stripe.com"
        });
    });
    it('should transform the template', () => {
        expect(generatorHandler
            .transformConfigs({ sites: { apikey: "this will be transformed {lol}", anotherKey: "{things}" } }, { lol: "butts", things: "stuffs" }))
            .to.be.eql({ sites: { apikey: "this will be transformed butts", anotherKey: "stuffs" } });
    });
    it('should merge config result set over manifest result set', () => {
        expect(generatorHandler.mergeManifestAndConfig(manifestResult, configResult, false)).to.be.eql({
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
        expect(generatorHandler.mergeManifestAndConfig(manifestResult, configResult, true)).to.be.eql({
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

describe('e2e tests for generating configs', () => {
    it('should transform configs and flatten', () => {
        expect(generatorHandler.transformResultsToConfigs(
            {
                sites: {
                    apiHost: "http://{env}-api.site.com",
                    Google: "{stuff}"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                },
                payment: {
                    stripeApi: "http://api.stripe.com"
                }
            },
            {
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
            }, {
                env: "prod",
                stuff: "things"
            }, { flatten: true, configOverride: true })).to.be.eql({
                apiHost: "http://prod-api.site.com",
                Google: "things",
                twitter: "http://twitter.com/api",
                facebook: "http://facebook.com/api",
                stripeApi: "http://api.stripe.com"
            })
    });
    it('should transForm configs', () => {
        expect(generatorHandler.transformResultsToConfigs(
            {
                sites: {
                    apiHost: "http://{env}-api.site.com",
                    Google: "{stuff}"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                },
                payment: {
                    stripeApi: "http://api.stripe.com"
                }
            },
            {
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
            }, {
                env: "prod",
                stuff: "things"
            }, { flatten: false, configOverride: true })).to.be.eql({
                sites: {
                    apiHost: "http://prod-api.site.com",
                    Google: "things"
                },
                integration: {
                    twitter: "http://twitter.com/api",
                    facebook: "http://facebook.com/api"
                },
                payment: { stripeApi: "http://api.stripe.com" }
            })
    })
});