/* eslint-disable no-underscore-dangle */
import adaptPartialPayment from './adaptPartialPayment';
import Account from '../../../models/Account';

export default async (amountPaid, unpaidAccount) => {
    const accountUpdate = adaptPartialPayment(amountPaid, unpaidAccount);

    const updatedAccount = await Account.findOneAndUpdate(
        { _id: unpaidAccount._id },
        accountUpdate,
        { new: true }
    ).lean();

    return updatedAccount;
};
