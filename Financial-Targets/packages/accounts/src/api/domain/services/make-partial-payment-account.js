import { accountEnum } from '../../utils/enumerators';
import { setAccountDate } from '../common';
import Account from '../../database/mongodb/models/account';

// account dueDate
const setDueDate = ({ newStatus, type, dueDate }) =>
    newStatus === accountEnum.status.done ? setAccountDate(type, dueDate) : dueDate;

// account status
const setStatus = (amountPaid, value) =>
    amountPaid === value ? accountEnum.status.done : accountEnum.status.pending;

// account amountPaid
const setAmountPaid = ({ amountPaid, amountPaidNow, value }) => {
    const newAmountPaid = amountPaid + amountPaidNow;

    return newAmountPaid <= value ? newAmountPaid : value;
};

const mountAccountPartiallyPaid = (unpaidAccount) => {
    const newAmountPaid = setAmountPaid(unpaidAccount);
    const newStatus = setStatus(newAmountPaid, unpaidAccount.value);
    const newDueDate = setDueDate({ newStatus, ...unpaidAccount });

    return {
        amountPaid: newAmountPaid,
        status: newStatus,
        dueDate: newDueDate,
    };
};

const makePartialPaymentAccount = async (unpaidAccount) => {
    if (unpaidAccount.status === accountEnum.status.done) return null;

    const accountPartiallyPaid = mountAccountPartiallyPaid(unpaidAccount);

    const account = await Account.findOneAndUpdate(
        { _id: unpaidAccount.id },
        accountPartiallyPaid
    ).lean();

    return account;
};

export default makePartialPaymentAccount;
