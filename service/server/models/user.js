"use strict";
const db_1 = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
let userSchema = new db_1.mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: true },
    salt: String,
    password: String,
    role: { type: String, enum: ['Basic', 'Admin'] },
}, { timestamps: true, strict: true });
userSchema.pre('save', function (next) {
    const user = this, SALT_FACTOR = 5;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
// maybe add type since we are using this for apikey and for passwords
userSchema.methods.createJWT = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role,
        expiresIn: 10080 // in seconds
    }, "SecretKey");
};
exports.User = db_1.mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map