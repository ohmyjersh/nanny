import {ApiKey} from '../models/ApiKey';
import Util from "../utils/utils";

export default class ApiKeyHandler {
    async create(apiKeyRequest:Object) {
        let guid = Util.newGuid();
        var encodedToken = new Buffer(guid).toString('base64');
        var apiKey = Object.assign({},apiKeyRequest,{apiKey:encodedToken, isActive:true});
        return await ApiKey.create(apiKey);
    }

    async getAllByUserId(id:string) {
        var keys = await ApiKey.find({userId:id});
        var masked = this.maskKeys(keys);
        return masked;
    }

    async getAll() {
        return await ApiKey.find();
    }

    maskKeys(keys) {
        return keys.map(x => {
            let maskedKey = x.apiKey.replace(/.(?=.{8,}$)/gm,'#');
            return Object.assign({},x,{apiKey:maskedKey});
        });
    }
    // maskKeys(keys) {
    //     let maskedKeys =  [];
    //     keys.forEach(x => {
    //         let maskedKey = x.apiKey.replace(/.(?=.{8,}$)/gm,'#');
    //         var newKey = Object.assign({},x,{apiKey:maskedKey});
    //         maskedKeys.push(newKey);
    //     })
    //     return maskedKeys;
    // }
}