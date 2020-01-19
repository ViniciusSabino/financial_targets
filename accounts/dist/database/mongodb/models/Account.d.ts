import mongoose, { Document } from 'mongoose';
import { AccountStatus, AccountPaymentForm, AccountType } from '../../../types';
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
declare const _default: mongoose.Model<AccountDocument, {}>;
export default _default;
