import { mongoose } from "../config/db";
//import { Schema, Document, Model } from "mongoose";

interface IConfiguration extends mongoose.Document {
    name: string;
    create: Date;
    configurations: {String:String};
}

export interface IConfigurationModel extends IConfiguration, mongoose.Document  {
}

let configurationSchema = new mongoose.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configurations: {String:String}
},{timestamps:true});

export let Configuration = mongoose.model<IConfigurationModel>('Configuration', configurationSchema);

//export type ConfigurationModel = Model<IConfiguration> & IConfigurationModel;
//export const Configuration: ConfigurationModel = <ConfigurationModel>mongoose.model<IConfiguration>("Configuration", configurationSchema);