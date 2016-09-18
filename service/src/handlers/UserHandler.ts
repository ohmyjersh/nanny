import UserRepository from "../repository/UserRepository";
import BaseHandler = require("./BaseHandler");
import IUsertModel from "../models/interfaces/IUserModel";
import UserModel = require("../models/UserModel");

interface IUserHandler extends BaseHandler<IUsertModel> {
}

class UserHandler implements IUserHandler {
    private _userRepository: UserRepository;
    
    constructor () {
        this._userRepository = new UserRepository();
    }  
        
    create (item: IUsertModel, callback: (error: any, result: any) => void) {
        this._userRepository.create(item, callback);   
    }
   
    retrieve (callback: (error: any, result: any) => void) {
         this._userRepository.retrieve(callback);
    }
    
    update (_id: string, item: IUsertModel, callback: (error: any, result: any) => void) {
        
        this._userRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);
            
            else 
                this._userRepository.update(_id, item, callback);
               
        });    
    }
    
    delete (_id: string, callback:(error: any, result: any) => void) {
        this._userRepository.delete(_id , callback);
    }
    
    findById (_id: string, callback: (error: any, result: IUsertModel) => void) {
        this._userRepository.findById(_id, callback);
    }
}

Object.seal(UserHandler);
export default UserHandler;