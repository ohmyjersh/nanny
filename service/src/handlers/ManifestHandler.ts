import ManifestRepository from "../repository/ManifestRepository";
import BaseHandler = require("./BaseHandler");
import IManifestModel from "../models/interfaces/IManifestModel";
import ManifestModel = require("../models/ManifestModel");

interface IManifestHandler extends BaseHandler<IManifestModel> {
}

class ManifestHandler implements IManifestHandler {
    private _manifestRepository: ManifestRepository;
    
    constructor () {
        this._manifestRepository = new ManifestRepository();
    }  
        
    create (item: IManifestModel, callback: (error: any, result: any) => void) {
        this._manifestRepository.create(item, callback);   
    }
   
    retrieve (callback: (error: any, result: any) => void) {
         this._manifestRepository.retrieve(callback);
    }
    
    update (_id: string, item: IManifestModel, callback: (error: any, result: any) => void) {
        
        this._manifestRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);
            
            else 
                this._manifestRepository.update(_id, item, callback);
               
        });    
    }
    
    delete (_id: string, callback:(error: any, result: any) => void) {
        this._manifestRepository.delete(_id , callback);
    }
    
    findById (_id: string, callback: (error: any, result: IManifestModel) => void) {
        this._manifestRepository.findById(_id, callback);
    }
    findByName (name: string, callback: (error: any, result: IManifestModel) => void) {
        this._manifestRepository.findOne({name:name}, callback);
    }
}

Object.seal(ManifestHandler);
export default ManifestHandler;