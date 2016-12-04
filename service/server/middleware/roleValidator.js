"use strict";
const ADMIN = "Admin";
exports.ADMIN = ADMIN;
const EDITOR = "Editor";
exports.EDITOR = EDITOR;
const BASIC = "Basic";
exports.BASIC = BASIC;
function checkRole(roles) {
    return function (req, res, next) {
        if (roles.indexOf(req.user.role) > -1) {
            return next();
        }
        console.log("Doesn't have the permissions");
        return res.status(400).send("You shall not pass");
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkRole;
//# sourceMappingURL=roleValidator.js.map