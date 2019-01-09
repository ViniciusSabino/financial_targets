import mongoose from 'mongoose';

const ConfigurationSchema = mongoose.Schema;

const configurationSchema = new ConfigurationSchema(
  {
    module: { type: String, required: true },
    config: { type: String, required: true },
    userId: { type: Number, required: false },
    value: { type: Object, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default mongoose.model('configuration', configurationSchema);
