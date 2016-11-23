"use strict";
const db_1 = require("../config/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
let apiKeySchema = new db_1.mongoose.Schema({
    username: { type: String, lowercase: true, required: true },
    userId: String,
    salt: String,
    apiKey: String,
    isActive: Boolean,
    comment: String,
    role: { type: String, enum: ['Basic', 'Admin'] },
}, { timestamps: true, strict: true });
apiKeySchema.methods.hashPassword = function (apiKey, done) {
    this.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(apiKey, this.salt, 1000, 32, (err, hash) => {
        if (err)
            return done(err);
        done(null, hash.toString('hex'));
    });
};
apiKeySchema.methods.comparePassword = function (apiKey, done) {
    crypto.pbkdf2(apiKey, this.salt, 1000, 32, (err, hash) => {
        if (err)
            return done(err);
        done(null, hash.toString('hex') === this.apiKey);
    });
};
// maybe add type since we are using this for apikey and for passwords
// refactor to add
apiKeySchema.methods.createJWT = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
    }, "SecretKey");
};
exports.ApiKey = db_1.mongoose.model('ApiKey', apiKeySchema);
//# sourceMappingURL=ApiKey.js.map