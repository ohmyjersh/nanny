import { User } from "../models/User";
export default class UserHandler {
    async create(user:Object) {
        return await User.create(user);
    }
    async getAll() {
        return await User.find();
    }
    async getById(id:string) {
        return await User.findById(id);
    }
    async getByName(name:string) {
        return await User.findOne({name:name});
    }
    async update(id:string, user:Object) {
        return await User.findByIdAndUpdate(id,user);
    }
    async delete(id:string) {
        return await User.findByIdAndRemove(id);
    }
}