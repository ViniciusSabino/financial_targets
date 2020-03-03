import mongoose from 'mongoose';

const AccountSchema = mongoose.Schema;

const accountSchema = new AccountSchema(
    {
        name: { type: String, required: true },
        description: { type: String },
        value: { type: Number, required: true },
        dueDate: { type: Date, required: true },
        status: { type: String, required: true },
        amountPaid: { type: Number, default: 0 },
        type: { type: String, required: true },
        paymentForm: { type: String, required: true },
        isRepeat: { type: Boolean, default: false },
        tags: [{ type: String }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model('accounts', accountSchema);
