"use strict";
const UserRepository_1 = require("../repository/UserRepository");
class UserHandler {
    constructor() {
        this._userRepository = new UserRepository_1.default();
    }
    create(item, callback) {
        this._userRepository.create(item, callback);
    }
    retrieve(callback) {
        this._userRepository.retrieve(callback);
    }
    update(_id, item, callback) {
        this._userRepository.findById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else
                this._userRepository.update(_id, item, callback);
        });
    }
    delete(_id, callback) {
        this._userRepository.delete(_id, callback);
    }
    findById(_id, callback) {
        this._userRepository.findById(_id, callback);
    }
}
Object.seal(UserHandler);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserHandler;
