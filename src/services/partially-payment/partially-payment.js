import { adapterPartiallyPayment } from './partially-payment-helper';
import AccountModel from '../../database/mongodb/models/Account';

export default async (currentAmountPaid, unpaidAccount) => {
    const accountChanges = adapterPartiallyPayment(currentAmountPaid, unpaidAccount);

    const { _id } = unpaidAccount;

    const updatedAccount = await AccountModel.findByIdAndUpdate(_id, accountChanges, {
        new: true,
    });

    return updatedAccount;
};
