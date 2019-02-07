import mongoose from "mongoose";

const GoalSchema = mongoose.Schema;

const goalSchema = new GoalSchema(
    {
        name: { type: String, required: true },
        description: { type: String },
        amount: { type: Number, required: true },
        action: { type: String },
        targetDate: { type: Date, required: true },
        goalType: { type: String, required: true },
        userId: { type: Number, required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model("goals", goalSchema);
