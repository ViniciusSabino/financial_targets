import Account from "../models/account";
import dictionary from "../utils/dictionaries/accounts";
import accountsFunctions from "./account-functions";
import search from "../utils/functions/search";
import AccountAllfilters from "./search/filters";
import application from "../utils/functions/application";

import { accountEnum } from "../utils/enumerators";

const create = async (account) => {
    await new Account(account).save();
};

const find = async ({ sort, order, limit, ...params }) => {
    const accountFilter = search.createFilterConditions(params, AccountAllfilters);
    const accounts = await Account.find(accountFilter)
        .sort(search.sortBy(order, sort))
        .limit(Number(limit));

    return application.result(accounts);
};

const listAll = async ({ userid, sort, order, limit }) => {
    const accounts = await Account.find({ userId: userid })
        .sort(search.sortBy(order, sort))
        .limit(Number(limit));

    return {
        count: accounts.length,
        data: accounts,
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

        const ajustedDate = accountsFunctions.setAccountDate(dueDate, type);

        return { _id, value, dueDate: ajustedDate, amountPaid: value, type };
    });

    return (
        adjustedAccounts.map(({ _id, ...account }) =>
            Account.findByIdAndUpdate(_id, {
                amountPaid: account.amountPaid,
                dueDate: account.dueDate,
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

    if (validAccount.errors.length) return result;

    const changedData = do {
        if (account.value === amountPaid)
            ({
                status: accountEnum.status.done,
                dueDate: accountsFunctions.setAccountDate(account.dueDate, account.type),
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

    const adjustedDate = accountsFunctions.setAccountDate(dueDate, type);

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
