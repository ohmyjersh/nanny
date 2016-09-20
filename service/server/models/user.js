"use strict";
const db_1 = require("../config/db");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    create: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: { type: String },
        lastName: { type: String }
    },
    role: {
        type: String,
        enum: ['Member', 'Client', 'Owner', 'Admin'],
        default: 'Member'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, { timestamps: true });
schema.pre('save', (next) => {
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
schema.method("comparePassword", (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
});
exports.User = db_1.mongoose.model("User", schema);
//# sourceMappingURL=user.js.map