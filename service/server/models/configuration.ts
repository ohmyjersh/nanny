// import * as mongoose from "mongoose";
import { mongoose } from "../config/db";
import { Schema, Document, Model } from "mongoose";

export interface IConfiguration extends Document {
    name: string;
    create: Date;
    configurations: Object;
}

export interface IConfigurationModel {
    findAllByName(name: string): Promise<IConfiguration>
}

const schema = new Schema({
    title: String,
    create: {
        type: Date,
        "default": Date.now
    },
    configuration: Object
});

schema.static("findAllByName", (name: string) => {

    return Configuration
        .findOne({ name: name})
        .lean()
        .exec();
});

export type ConfigurationModel = Model<IConfiguration> & IConfigurationModel;

export const Configuration: ConfigurationModel = <ConfigurationModel>mongoose.model<IConfiguration>("Configuration", schema);