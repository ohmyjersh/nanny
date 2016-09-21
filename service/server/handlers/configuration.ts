import { Configuration } from "../models/configuration";
export default class ConfigurationHandler {
    async create(configuration:Object) {
        return await Configuration.create(configuration);
    }
    async getAll() {
        return await Configuration.find();
    }
    async getById(id:string) {
        return await Configuration.findById(id);
    }
    async getByName(name:string){
        return await Configuration.findOne({name:name});
    }
    async update(id:string, configuration:Object) {
        return await Configuration.findByIdAndUpdate(id,configuration);
    }
    async delete(id:string) {
        return await Configuration.findByIdAndRemove(id);
    }
}