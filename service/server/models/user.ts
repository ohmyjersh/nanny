
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

interface IUser {
  _id: any;
  username: String;
  salt: String;
  password: String;
  role: String;
}

export interface IUserModel extends IUser, mongoose.Document {
  hashPassword(password: string, done: (err: any, hash: string) => any);
  comparePassword(password: string, done: (err: any, isMatch: boolean) => any);
  createJWT(): string;
}

let userSchema = new mongoose.Schema({
  username: { type: String, sparse: true, lowercase: true, trim: true },
  salt: String,
  password: String,
  role: { type: String, enum: ['Basic', 'Admin'] },

  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

userSchema.methods.hashPassword = function(password: string, done: Function) {
  this.salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
    if (err) return done(err);
    done(null, hash.toString('hex'));
  });
}

userSchema.methods.comparePassword = function(password: string, done: Function) {
  crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
    if (err) return done(err);
    done(null, hash.toString('hex') === this.password);
  });
}

userSchema.methods.createJWT = function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    role: this.role
  }, "SecretKey");
}

export let User = mongoose.model<IUserModel>('User', userSchema);

// import { mongoose } from "../config/db";
// import { Schema, Document, Model } from "mongoose";
// import * as bcrypt from "bcrypt-nodejs";

// export interface IUser extends Document {
//     email: string;
//     password: string,
//     profile: {string:string},
//     role: string,
//     resetPasswordToken: string,
//     resetPasswordExpires: string,
//     comparePassword(password:string, cb:Function):any;
// }

// let schema = new Schema({
//   email: {
//     type: String,
//     lowercase: true,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   profile: {
//     firstName: { type: String },
//     lastName: { type: String }
//   },
//   role: {
//     type: String,
//     enum: ['Member', 'Client', 'Owner', 'Admin'],
//     default: 'Member'
//   },
//   resetPasswordToken: { type: String },
//   resetPasswordExpires: { type: Date }
// },{timestamps:true});

// schema.pre('save', (next)=> {
//     const user = this, SALT_FACTOR=5;
//     if(!user.isModified('password'))return next();
//     bcrypt.genSalt(SALT_FACTOR, (err,salt) => {
//         if(err) return next(err);
//         bcrypt.hash(user.password, salt, null, (err, hash)=> {
//             if(err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });

// schema.methods.comparePassword = (candidatePassword, cb) => {
//   var user = this;
//   bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
//     console.log(isMatch);
//     if (err) { return cb(err); }
//         cb(null, isMatch);
//   });
// };

// export const User= mongoose.model<IUser>("User", schema);