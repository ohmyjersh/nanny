const ADMIN = "Admin";
const EDITOR = "Editor";
const BASIC = "Basic";
export {ADMIN, EDITOR, BASIC}
export default function checkRole(roles) {
    return function (req, res, next) {
        if (roles.indexOf(req.user.role) > -1) {
            return next();
        }
        console.log("Doesn't have the permissions");
        return res.status(400).send("You shall not pass");
    }
}