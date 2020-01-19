import { Account } from '../types';

const changeAccountAmountPaid = (currentAmountPaid: number, unpaidAccount: Account): number => {
    const { amountPaid, value } = unpaidAccount;

    const updatedAmountPaid = amountPaid ? currentAmountPaid + amountPaid : currentAmountPaid;

    if (updatedAmountPaid <= value) return updatedAmountPaid;

    return value;
};

export default changeAccountAmountPaid;
