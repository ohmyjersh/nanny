"use strict";
function getSecret() {
    console.log('get secret');
    if (!process.env.SECRET) {
        'Running in development mode with a default known SECRET. Do not run in Production!';
    }
    return process.env.SECRET ? process.env.SECRET : "THISISSECRET";
}
exports.getSecret = getSecret;
//# sourceMappingURL=config.js.map