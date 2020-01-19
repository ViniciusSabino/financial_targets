import adapterPartiallyPayment from '../helpers/adapter-partially-payment';
import AccountModel from '../database/mongodb/models/Account';
import { Account } from '../types';

export default async (currentAmountPaid: number, unpaidAccount: Account): Promise<Account> => {
    const accountChanges = adapterPartiallyPayment(currentAmountPaid, unpaidAccount);

    const { _id } = unpaidAccount;

    const updatedAccount = await AccountModel.findByIdAndUpdate(_id, accountChanges, {
        new: true,
    });

    return updatedAccount;
};
