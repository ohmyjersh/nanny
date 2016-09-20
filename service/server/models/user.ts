import { mongoose } from "../config/db";
import { Schema, Document, Model } from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

export interface User extends Document {
    email: string;
    password: string,
    profile: {string:string},
    role: string,
    resetPasswordToken: string,
    resetPasswordExpires: string
}

export interface IUserModel {
}

const schema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  create: {
      type: Date,
      required:true
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
},{timestamps:true});

schema.pre('save', (next)=> {
    const user = this, SALT_FACTOR=5;
    if(!user.isModified('password'))return next();
    bcrypt.genSalt(SALT_FACTOR, (err,salt) => {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash)=> {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

schema.method("comparePassword", (candidatePassword: string, cb:any) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch)=>{
        if(err) {return cb(err);}
        cb(null, isMatch);
    });
});

export type UserModel = Model<User> & IUserModel;

export const User: UserModel = <UserModel>mongoose.model<User>("User", schema);