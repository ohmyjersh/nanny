"use strict";
const db_1 = require("../config/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
let apiKeySchema = new db_1.mongoose.Schema({}, { timestamps: true, strict: true });
apiKeySchema.methods.hashPassword = function (password, done) {
    this.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
        if (err)
            return done(err);
        done(null, hash.toString('hex'));
    });
};
apiKeySchema.methods.comparePassword = function (password, done) {
    crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
        if (err)
            return done(err);
        done(null, hash.toString('hex') === this.password);
    });
};
// maybe add type since we are using this for apikey and for passwords
// refactor to add
apiKeySchema.methods.createJWT = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role
    }, "SecretKey");
};
exports.ApiKey = db_1.mongoose.model('ApiKey', apiKeySchema);
//# sourceMappingURL=ApiKey.js.map