import ConfigurationRepository from "../repository/ConfigurationRepository";
import BaseHandler = require("./BaseHandler");
import IConfigurationModel from "../models/interfaces/IConfigurationModel";
import ConfigurationModel = require("../models/ConfigurationModel");

interface IConfigurationHandler extends BaseHandler<IConfigurationModel> {
}

class ConfigurationHandler implements IConfigurationHandler {
    private _configurationRepository: ConfigurationRepository;
    
    constructor () {
        this._configurationRepository = new ConfigurationRepository();
    }  
        
    create (item: IConfigurationModel, callback: (error: any, result: any) => void) {
        this._configurationRepository.create(item, callback);   
    }
   
    retrieve (callback: (error: any, result: any) => void) {
         this._configurationRepository.retrieve(callback);
    }
    
    update (_id: string, item: IConfigurationModel, callback: (error: any, result: any) => void) {
        
        this._configurationRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);
            
            else 
                this._configurationRepository.update(_id, item, callback);
               
        });    
    }
    
    delete (_id: string, callback:(error: any, result: any) => void) {
        this._configurationRepository.delete(_id , callback);
    }
    
    findById (_id: string, callback: (error: any, result: IConfigurationModel) => void) {
        this._configurationRepository.findById(_id, callback);
    }
    findByName (name: string, callback: (error: any, result: IConfigurationModel) => void) {
        this._configurationRepository.findOne({name:name}, callback);
    }
}

Object.seal(ConfigurationHandler);
export default ConfigurationHandler;