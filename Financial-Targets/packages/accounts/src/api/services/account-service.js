import dictionary from '../utils/dictionaries';
import { setAccountDate } from './functions/account-functions';
import { accountEnum } from '../utils/enumerators';

const makePartialPayment = async ({ accountId, amountPaid }) => {
    const account = await findAccountById(accountId);

    if (amountPaid > account.value) return { errors: [dictionary.amountPaidIsInvalid] };

    if (account.status === accountEnum.status.done) return { errors: [dictionary.paymentDone] };

    const changedData = (() => {
        if (account.value === amountPaid) {
            return {
                status: accountEnum.status.done,
                dueDate: setAccountDate(account.dueDate, account.type),
            };
        }
        return { status: account.status, dueDate: account.dueDate };
    })();

    const accountUpdated = await findByIdAndUpdate(accountId, { ...changedData, amountPaid });

    return { errors: [], data: accountUpdated };
};

const sendNext = async (accountId) => {
    const { type, dueDate } = await findAccountById(accountId);

    const adjustedDate = setAccountDate(dueDate, type);

    const accountUpdated = await findByIdAndUpdate(accountId, {
        dueDate: adjustedDate,
        status: accountEnum.status.pending,
    });

    return accountUpdated;
};

export default {
    makePartialPayment,
    sendNext,
};
