import {ApiKey} from '../models/ApiKey';
import Util from "../utils/utils";

export default class ApiKeyHandler {
    async create(apiKeyRequest:Object) {
        let guid = Util.newGuid();
        var encodedToken = new Buffer(guid).toString('base64');
        var apiKey = Object.assign({},apiKeyRequest,{apiKey:encodedToken});
        return await ApiKey.create(apiKey);
    }

    async getAllByUserId(id:string) {
        return await ApiKey.find({userId:id});
    }

    async getAll() {
        return await ApiKey.find();
    }
}