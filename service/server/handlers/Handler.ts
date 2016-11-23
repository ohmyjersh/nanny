
export default class Handler {
    private nanny;
    constructor(T: any) {
        this.nanny = T;
    }
    async create(newObject:Object) {
        return await this.nanny.create(newObject);
    }
    async getAll() {
        return await this.nanny.find();
    }
    async getById(id:string) {
        return await this.nanny.findById(id);
    }
    async getByName(name:string) {
        return await this.nanny.findOne({name:name});
    }
    async update(id:string, user:Object) {
        return await this.nanny.findByIdAndUpdate(id,user);
    }
    async delete(id:string) {
        return await this.nanny.findByIdAndRemove(id);
    }
}