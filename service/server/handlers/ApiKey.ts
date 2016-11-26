import {ApiKey} from '../models/ApiKey';
import Util from "../utils/utils";

export default class ApiKeyHandler {
    async create(apiKeyRequest:Object) {
        let guid = Util.newGuid();
        let encodedToken = new Buffer(guid).toString('base64');
        let apiKey = Object.assign({},apiKeyRequest,{apiKey:encodedToken, isActive:true});
        return await ApiKey.create(apiKey);
    }

    async getAllByUserId(id:string) {
        let keys = await ApiKey.find({userId:id});
        let masked = this.maskKeys(keys);
        return masked;
    }

    async getAll() {
        let keys = await ApiKey.find();
        let masked = this.maskKeys(keys);
        return masked;
    }

    maskKeys(keys) {
        return keys.map(x => {
            let maskedKey = x.apiKey.replace(/.(?=.{5,}$)/gm,'#');
            let shortString = maskedKey.substr(maskedKey.length - 12);
            return Object.assign({},x,{apiKey:`...${shortString}`});
        });
    }
}