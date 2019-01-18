import mongoose from "mongoose";

const TagSchema = mongoose.Schema;

const tagSchema = new TagSchema(
    {
        name: { type: String, required: true },
        color: { type: String, required: true },
        default: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model("tags", tagSchema);
