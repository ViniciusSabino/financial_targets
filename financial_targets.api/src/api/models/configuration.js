import mongoose from "mongoose";

const ConfigurationSchema = mongoose.Schema;

const configurationSchema = new ConfigurationSchema(
    {
        userId: { type: Number, required: false },
        config: [{ module: String, name: String, value: Object }],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default mongoose.model("configuration", configurationSchema);
