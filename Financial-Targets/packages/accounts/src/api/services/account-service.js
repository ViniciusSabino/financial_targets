import moment from 'moment';

import dictionary from '../utils/dictionaries/account-dictionary';
import search from '../utils/functions/search';
import AccountAllfilters from '../utils/constants/filters';
import { setAccountDate } from './functions/account-functions';
import { buildTheResult } from '../utils/functions/application';
import { getCurrentDate, getCurrentMonth, getCurrentYear } from '../utils/functions/dates';
import { accountEnum } from '../utils/enumerators';

const edit = async ({ _id, ...account }) => {
    const accountUpdated = await findByIdAndUpdate(_id, account);

    return accountUpdated;
};

const deleteAccount = async (accountsIds) => {
    await deleteAccounts(accountsIds);
};

const makePayment = async (accountsIds) => {
    const accounts = await findAccounts({ filter: { _id: accountsIds } });

    const adjustedAccounts = accounts.map((account) => {
        if (account.status === accountEnum.status.done) {
            throw new Error(dictionary.paymentDone.message);
        }

        const { value, type, _id, dueDate } = account;

        const ajustedDate = setAccountDate(dueDate, type);

        return { _id, value, dueDate: ajustedDate, amountPaid: value, type };
    });

    return (
        adjustedAccounts.map(({ _id, amountPaid, dueDate }) =>
            findByIdAndUpdate(_id, {
                amountPaid,
                dueDate,
                status: accountEnum.status.done,
            })
        ) |> Promise.all
    );
};

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
    edit,
    deleteAccount,
    makePayment,
    makePartialPayment,
    sendNext,
};
