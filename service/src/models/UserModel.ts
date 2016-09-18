import IUserModel from "./interfaces/IUserModel";

class UserModel  {
    private _userModel: IUserModel
    constructor(userModel: IUserModel) {
         this._userModel = userModel;
     }
}

Object.seal(UserModel);
export default UserModel;