import moment from 'moment';

import dictionary from '../utils/dictionaries/accounts';
import search from '../utils/functions/search';
import AccountAllfilters from '../utils/constants/filters';
import { setAccountDate } from './functions/account-functions';
import { buildTheResult } from '../utils/functions/application';
import { getCurrentDate, getCurrentMonth, getCurrentYear } from '../utils/functions/dates';
import { accountEnum } from '../utils/enumerators';
import {
    findAccounts,
    createAccount,
    findByIdAndUpdate,
    findAccountById,
    deleteAccounts,
} from '../database/mongodb/queries';

const create = async (account) => {
    await createAccount(account);
};

const find = async ({ sort, order, limit, ...params }) => {
    const accountFilter = search.createFilterConditions(params, AccountAllfilters);

    const accounts = await findAccounts({ filter: accountFilter, sort, order, limit });

    return buildTheResult(accounts);
};

const listAll = async ({ userid, sort, order, limit }) => {
    const filter = { userId: userid };

    const accounts = await findAccounts({ filter, sort, order, limit });

    const [currentDate, currentMonth, currentYear] = [
        getCurrentDate(),
        getCurrentMonth(),
        getCurrentYear(),
    ];

    const recalculatedAccounts = accounts.map((account) => {
        const dueDateAccount = moment(account.dueDate).format();

        if (dueDateAccount < currentDate) {
            const [accountMonth, accountYear] = [
                moment(dueDateAccount).month() + 1,
                moment(dueDateAccount).month() + 1,
            ];
            switch (account.type) {
                case accountEnum.type.monthly: {
                    if (accountMonth === currentMonth)
                        return {
                            ...account,
                            status:
                                account.status === accountEnum.status.pending
                                    ? accountEnum.status.expired
                                    : account.status,
                        };

                    const adjustedMonthAccount = setAccountDate(dueDateAccount, account.type);

                    if (adjustedMonthAccount < currentDate)
                        return {
                            ...account,
                            status: accountEnum.status.expired,
                            dueDate: adjustedMonthAccount,
                            amountPaid: 0,
                        };

                    return {
                        ...account,
                        status: accountEnum.status.pending,
                        amountPaid: 0,
                        dueDate: adjustedMonthAccount,
                    };
                }

                case accountEnum.type.yearly: {
                    if (accountYear === currentYear) return account;

                    const adjustedYearAccount = setAccountDate(dueDateAccount, account.type);

                    if (adjustedYearAccount < currentDate)
                        return {
                            ...account,
                            status: accountEnum.status.expired,
                            dueDate: adjustedYearAccount,
                            amountPaid: 0,
                        };

                    return {
                        ...account,
                        status: accountEnum.status.pending,
                        amountPaid: 0,
                        dueDate: adjustedYearAccount,
                    };
                }

                default:
                    return null;
            }
        } else return account;
    });

    return {
        count: accounts.length,
        data: recalculatedAccounts,
    };
};

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
    create,
    find,
    listAll,
    edit,
    deleteAccount,
    makePayment,
    makePartialPayment,
    sendNext,
};
