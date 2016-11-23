import { mongoose } from "../config/db";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
// import * as uuid from 'uuid';
interface IApiKey {
    _id: any;
    userId: string;
    userName: string;
    salt: string;
    apiKey: string;
    isActive: boolean;
    comment: string;
}

export interface IApiKeyModel extends IApiKey, mongoose.Document {
    hashPassword(apiKey: string, done: (err: any, hash: string) => any);
    comparePassword(apiKey: string, done: (err: any, isMatch: boolean) => any);
    createJWT(): string;
}

let apiKeySchema = new mongoose.Schema({
  username: { type: String, lowercase: true, required: true},
  userId: String,
  salt: String,
  apiKey: String,
  isActive: Boolean,
  comment: String,
  role: { type: String, enum: ['Basic', 'Admin'] },
},
    { timestamps: true, strict: true });

apiKeySchema.methods.hashPassword = function (apiKey: string, done: Function) {
    this.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(apiKey, this.salt, 1000, 32, (err, hash) => {
        if (err) return done(err);
        done(null, hash.toString('hex'));
    });
}

apiKeySchema.methods.comparePassword = function (apiKey: string, done: Function) {
    crypto.pbkdf2(apiKey, this.salt, 1000, 32, (err, hash) => {
        if (err) return done(err);
        done(null, hash.toString('hex') === this.apiKey);
    });
}
// maybe add type since we are using this for apikey and for passwords
// refactor to add
apiKeySchema.methods.createJWT = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
    }, "SecretKey");
}

export let ApiKey = mongoose.model<IApiKeyModel>('ApiKey', apiKeySchema);