"use strict";
var jwt = require('express-jwt');
var userAuth = jwt({
    secret: 'SecretKey',
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});
exports.userAuth = userAuth;
var apiKeyAuth = jwt({
    secret: 'ApiSecretKey',
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'ApiKey') {
            return req.headers.authorization.split(' ')[1];
        }
        else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});
exports.apiKeyAuth = apiKeyAuth;
//# sourceMappingURL=tokenValidator.js.map