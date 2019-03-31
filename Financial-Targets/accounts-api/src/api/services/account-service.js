import Account from "../models/account";
import dictionary from "../utils/dictionaries/accounts";
import accountsFunctions from "./account-functions";
import search from "../utils/functions/search";
import AccountAllfilters from "./search/filters";
import application from "../utils/functions/application";

import { accounts } from "../utils/enumerators";

const accountEnum = accounts;

const create = async (account) => {
    const accountObj = new Account(account);
    await accountObj.save();
};

const find = async (params) => {
    const accountFilter = search.createFilterConditions(params, AccountAllfilters);
    const { limit, order, sort } = params;
    const accounts = await Account.find(accountFilter)
        .sort(search.sortBy(order, sort))
        .limit(Number(limit));

    return application.result(accounts);
};

const listAll = async (params) => {
    const { sort, limit, order } = params;
    const accounts = await Account.find({ userId: params.userId })
        .sort(search.sortBy(order, sort))
        .limit(Number(limit));

    return {
        count: accounts.length,
        data: accounts,
    };
};

const edit = async (account) => {
    const accountUpdated = await Account.findByIdAndUpdate({ _id: account._id }, account, {
        new: true,
    }).lean();

    return accountUpdated;
};

const deleteAccount = async (accountsIds) => {
    await Account.deleteMany({ _id: accountsIds });
};

const makePayment = async (accountsIds) => {
    const accounts = await Account.find({ _id: accountsIds });

    const adjustedData = accounts.map((account) => {
        if (account.status === accountEnum.status.done)
            throw new Error(dictionary.account.paymentDone.message);

        const { value, type, _id, dueDate } = account;
        const ajustedDate = accountsFunctions.setAccountDate(dueDate, type);

        return { _id, value, dueDate: ajustedDate, amountPaid: value, type };
    });
    adjustedData.forEach(async (account) => {
        const accountUpdate = {
            amountPaid: account.amountPaid,
            dueDate: account.dueDate,
            status: accountEnum.status.done,
        };

        await Account.findByIdAndUpdate(account._id, accountUpdate);
    });

    return adjustedData;
};

const makePartialPayment = async (input) => {
    const { accountId, amountPaid } = input;
    const account = await Account.findById(accountId);

    const result = do {
        if (amountPaid > account.value) ({ errors: [dictionary.account.amountPaidIsInvalid] });
        else if (account.status === accountEnum.status.done)
            ({ errors: [dictionary.account.paymentDone] });
        else ({ errors: [] });
    };

    if (result.errors.length) return result;

    const changedData = do {
        if (account.value === amountPaid)
            ({
                status: accountEnum.status.done,
                dueDate: accountsFunctions.setAccountDate(account.dueDate, account.type),
            });
        else ({ status: account.status, dueDate: account.dueDate });
    };

    const accountUpdated = await Account.findOneAndUpdate(
        { _id: input.accountId },
        { ...changedData, amountPaid: input.amountPaid },
        { new: true }
    );

    return { ...result, data: accountUpdated };
};

const sendNext = async (accountId) => {
    const { type, dueDate } = await Account.findById(accountId);
    const adjustedDate = accountsFunctions.setAccountDate(dueDate, type);
    const adjustedStatus = accountEnum.status.pending;
    const accountUpdated = await Account.findOneAndUpdate(
        { _id: accountId },
        { dueDate: adjustedDate, status: adjustedStatus },
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
