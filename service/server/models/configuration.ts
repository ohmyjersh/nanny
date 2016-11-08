import { mongoose } from "../config/db";
//import { Schema, Document, Model } from "mongoose";

interface IConfiguration extends mongoose.Document {
    title: string;
    configuration: string;
    raw: string;
}

export interface IConfigurationModel extends IConfiguration, mongoose.Document  {
}

let configurationSchema = new mongoose.Schema({
    title: String,
    configuration: String,
    raw: String
},{timestamps:true});

export let Configuration = mongoose.model<IConfigurationModel>('Configuration', configurationSchema);