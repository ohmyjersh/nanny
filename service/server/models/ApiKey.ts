import { mongoose } from "../config/db";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
// import * as uuid from 'uuid';
interface IApiKey {
    _id: any;
    userId: string;
    userName: string;
    role: string;
    salt: string;
    ApiKey: string;
    isActive: boolean
}

export interface IApiKeyModel extends IApiKey, mongoose.Document {
    hashPassword(password: string, done: (err: any, hash: string) => any);
    comparePassword(password: string, done: (err: any, isMatch: boolean) => any);
    createJWT(): string;
}

let apiKeySchema = new mongoose.Schema({

},
    { timestamps: true, strict: true });

apiKeySchema.methods.hashPassword = function (password: string, done: Function) {
    this.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
        if (err) return done(err);
        done(null, hash.toString('hex'));
    });
}

apiKeySchema.methods.comparePassword = function (password: string, done: Function) {
    crypto.pbkdf2(password, this.salt, 1000, 32, (err, hash) => {
        if (err) return done(err);
        done(null, hash.toString('hex') === this.password);
    });
}
// maybe add type since we are using this for apikey and for passwords
// refactor to add
apiKeySchema.methods.createJWT = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role
    }, "SecretKey");
}

export let ApiKey = mongoose.model<IApiKeyModel>('ApiKey', apiKeySchema);