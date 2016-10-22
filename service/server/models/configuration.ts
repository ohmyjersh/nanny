import { mongoose } from "../config/db";
//import { Schema, Document, Model } from "mongoose";

interface IConfiguration extends mongoose.Document {
    name: string;
    create: Date;
    configuration: string;
    raw: string
}

export interface IConfigurationModel extends IConfiguration, mongoose.Document  {
}

let configurationSchema = new mongoose.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configurations: String,
    raw: String
},{timestamps:true});

export let Configuration = mongoose.model<IConfigurationModel>('Configuration', configurationSchema);