import mongoose, { Document } from 'mongoose';

import { AccountStatus, AccountPaymentForm, AccountType } from '../../../types';

const AccountSchema = mongoose.Schema;

interface AccountDocument extends Document {
    _id: string;
    name: string;
    description?: string;
    value: number;
    dueDate: string;
    amountPaid?: number;
    type: AccountType;
    paymentForm: AccountPaymentForm;
    status: AccountStatus;
    isRepeat: boolean;
    tags: string[];
}

const accountSchema = new AccountSchema(
    {
        userId: { type: Number, required: true },
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

export default mongoose.model<AccountDocument>('accounts', accountSchema);
