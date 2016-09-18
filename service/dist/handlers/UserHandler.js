"use strict";
var UserRepository_1 = require("../repository/UserRepository");
var UserHandler = (function () {
    function UserHandler() {
        this._userRepository = new UserRepository_1["default"]();
    }
    UserHandler.prototype.create = function (item, callback) {
        this._userRepository.create(item, callback);
    };
    UserHandler.prototype.retrieve = function (callback) {
        this._userRepository.retrieve(callback);
    };
    UserHandler.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._userRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._userRepository.update(_id, item, callback);
        });
    };
    UserHandler.prototype.delete = function (_id, callback) {
        this._userRepository.delete(_id, callback);
    };
    UserHandler.prototype.findById = function (_id, callback) {
        this._userRepository.findById(_id, callback);
    };
    return UserHandler;
}());
Object.seal(UserHandler);
exports.__esModule = true;
exports["default"] = UserHandler;
//# sourceMappingURL=UserHandler.js.map