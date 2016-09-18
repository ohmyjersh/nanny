import * as mongoose from 'mongoose';

interface IConfigurationModel extends mongoose.Document {
  name: string;
  configurations:[Object];
}

export default IConfigurationModel;