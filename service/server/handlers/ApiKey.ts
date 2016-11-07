import {ApiKey} from '../models/ApiKey';

export default class ApiKeyHandler {
    async create(apiKey:Object) {
        return await ApiKey.create(apiKey);
    }   

    async getAll(account:String) {
        return await ApiKey.find({account:account});
    }
    // async getByUserName(id:string) {
    //     return await ApiKey.findByUserName({

    //     })
    // }
}