import { Manifest } from "../models/manifest";
export default class ManifestHandler {
    async create() {
        return await Manifest.create({thing:"thing"});
    }
    async getAll() {
        return await Manifest.find();
    }
    async getById(id:string) {
        return await Manifest.findById(id);
    }
    async getByName(name:string){
        return await Manifest.findOne({name:name});
    }
    async update(id:string, manifest:Object) {
        return await Manifest.findByIdAndUpdate(id, manifest);
    }
    async delete(id:string) {
        return await Manifest.findByIdAndRemove(id);
    }
}