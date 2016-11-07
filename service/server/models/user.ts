import { mongoose } from "../config/db";
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
  username: { type: String, lowercase: true, unique: true, required: true},
  salt: String,
  password: String,
  role: { type: String, enum: ['Basic', 'Admin'] },
  },
  {timestamps:true, strict: true});

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

// maybe add type since we are using this for apikey and for passwords
userSchema.methods.createJWT = function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    role: this.role
  }, "SecretKey");
}

export let User = mongoose.model<IUserModel>('User', userSchema);