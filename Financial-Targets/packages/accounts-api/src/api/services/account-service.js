import moment from "moment";

import Account from "../database/mongodb/models/account";
import dictionary from "../utils/dictionaries/accounts";
import { setAccountDate } from "./functions/account-functions";
import search from "../utils/functions/search";
import AccountAllfilters from "../utils/constants/filters";
import { buildTheResult } from "../utils/functions/application";
import { findAccounts } from "../database/mongodb/queries";
import { getCurrentDate, getCurrentMonth, getCurrentYear } from "../utils/functions/dates";
import { accountEnum } from "../utils/enumerators";

const create = async (account) => {
    await new Account(account).save();
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
                    break;
            }
        } else return account;
    });

    return {
        count: accounts.length,
        data: recalculatedAccounts,
    };
};

const edit = async ({ _id, ...account }) => {
    const accountUpdated = await Account.findByIdAndUpdate({ _id }, account, {
        new: true,
    }).lean();

    return accountUpdated;
};

const deleteAccount = async (accountsIds) => {
    await Account.deleteMany({ _id: accountsIds });
};

const makePayment = async (accountsIds) => {
    const accounts = await Account.find({ _id: accountsIds });

    const adjustedAccounts = accounts.map((account) => {
        if (account.status === accountEnum.status.done)
            throw new Error(dictionary.paymentDone.message);

        const { value, type, _id, dueDate } = account;

        const ajustedDate = setAccountDate(dueDate, type);

        return { _id, value, dueDate: ajustedDate, amountPaid: value, type };
    });

    return (
        adjustedAccounts.map(({ _id, amountPaid, dueDate }) =>
            Account.findByIdAndUpdate(_id, {
                amountPaid,
                dueDate,
                status: accountEnum.status.done,
            })
        ) |> Promise.all
    );
};

const makePartialPayment = async ({ accountId, amountPaid }) => {
    const account = await Account.findById(accountId);

    const validAccount = do {
        if (amountPaid > account.value) ({ errors: [dictionary.account.amountPaidIsInvalid] });
        else if (account.status === accountEnum.status.done) ({ errors: [dictionary.paymentDone] });
        else ({ errors: [] });
    };

    if (validAccount.errors.length) return validAccount;

    const changedData = do {
        if (account.value === amountPaid)
            ({
                status: accountEnum.status.done,
                dueDate: setAccountDate(account.dueDate, account.type),
            });
        else ({ status: account.status, dueDate: account.dueDate });
    };

    const accountUpdated = await Account.findOneAndUpdate(
        { _id: accountId },
        { ...changedData, amountPaid },
        { new: true }
    );

    return { ...validAccount, data: accountUpdated };
};

const sendNext = async (accountId) => {
    const { type, dueDate } = await Account.findById(accountId);

    const adjustedDate = setAccountDate(dueDate, type);

    const accountUpdated = await Account.findOneAndUpdate(
        { _id: accountId },
        { dueDate: adjustedDate, status: accountEnum.status.pending },
        { new: true }
    );
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
