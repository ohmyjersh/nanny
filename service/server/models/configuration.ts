// import * as mongoose from "mongoose";
import { mongoose } from "../config/db";

interface IConfiguration extends Document {
    name: string;
    create: Date;
    configurations: Object;
}

export interface IConfigurationModel extends IConfiguration, mongoose.Document  {
}

let configurationSchema = new mongoose.Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object
},{timestamps:true});

export let Configuration = mongoose.model('Configuration', configurationSchema);