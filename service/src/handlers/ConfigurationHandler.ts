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
        // async getConfigurationByManfiest(configurations:any, transforms:any, flatten:boolean = false){
    //     let configs = {
    //         validationErrors:[]
    //     }
    //     for(let config in configurations) {
    //         try {
    //             let result = await this.getConfiguraton(configurations[config]);
    //             var newObject = {};
    //             if(result.length === 0) {
    //                 configs.validationErrors.push(`${config} does not exist`);
    //             }
    //             else {
    //                 result[0].configurations.forEach(x => {
    //                     var configKey = Object.keys(x)[0];
    //                     let transformed = this.transformConfigData(x[configKey],transforms);

    //                     if(flatten) {
    //                         newObject[configKey]= transformed;
    //                     }
    //                     else {
    //                         newObject[config] = {[configKey]: transformed};
    //                     }
    //                 });
    //             }
    //             Object.assign(configs, newObject);
    //         }
    //     catch(e) {
    //         console.log(e);
    //     }

    //     Object.assign(configs, newObject);
    //     }
    //     return configs;
    // }

    // async getConfiguraton(name:string) {
    //     return await this.dataHandler.getData(name, "configurations");
    // }

    // private transformConfigData(config: string, transformer: Object) {
    //     return format(config, transformer);
    // }
    
}

Object.seal(ConfigurationHandler);
export default ConfigurationHandler;