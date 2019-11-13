import adapterPartiallyPayment from './adapter-partially-payment';
import Account from '../../../models/Account';

export default async (amountPaid, unpaidAccount) => {
    const accountUpdate = adapterPartiallyPayment(amountPaid, unpaidAccount);

    const { _id } = unpaidAccount;

    const updatedAccount = await Account.findOneAndUpdate({ _id }, accountUpdate, {
        new: true,
    }).lean();

    return updatedAccount;
};
