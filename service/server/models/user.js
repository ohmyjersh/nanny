"use strict";
const db_1 = require("../config/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
let userSchema = new db_1.mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: true },
    salt: String,
    password: String,
    role: { type: String, enum: ['Basic', 'Admin'] },
}, { timestamps: true, strict: true });
userSchema.methods.hashPassword = function (password, done) {
    this.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
        if (err)
            return done(err);
        done(null, hash.toString('hex'));
    });
};
userSchema.methods.comparePassword = function (password, done) {
    crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
        if (err)
            return done(err);
        done(null, hash.toString('hex') === this.password);
    });
};
userSchema.methods.createJWT = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role
    }, "SecretKey");
};
exports.User = db_1.mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map