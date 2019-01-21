import Account from "../../models/account";
import enumerators from "../../utils/enumerators";
import dictionary from "../../utils/dictionaries";
import accountsUtil from "../../utils/accounts";
import util from "../../utils/functions";
import AccountAllfilters from "../accounts/accountFilters";

const { accounts: accountEnum } = enumerators;

const listAllAccounts = async userId => {
    const accounts = await Account.find({ userId });

    return {
        count: accounts.length,
        data: accounts
    };
};

const findAccounts = async params => {
    const accountFilter = util.createFilterConditions(
        params,
        AccountAllfilters
    );
    console.log(accountFilter);
    const accounts = await Account.find(accountFilter);

    return util.createResult(accounts);
};

const saveAccount = async account => {
    const accountObj = new Account(account);

    return await accountObj.save();
};

const makePayment = async accountsIds => {
    const accounts = await Account.find({ _id: accountsIds });
    const adjustedData = accounts.map(account => {
        const { value, type, _id, dueDate } = account;
        const ajustedDate = accountsUtil.setAccountDate(dueDate, type);

        return { _id, value, dueDate: ajustedDate, amountPaid: value, type };
    });
    adjustedData.forEach(async account => {
        const accountUpdate = {
            amountPaid: account.amountPaid,
            dueDate: account.dueDate,
            status: accountEnum.status.done
        };
        await Account.updateOne({ _id: account._id }, accountUpdate);
    });

    return adjustedData;
};

const deleteAccounts = async accountsIds =>
    await Account.deleteMany({ _id: accountsIds });

const editAccount = async (accountId, account) => {
    const accountUpdated = await Account.findOneAndUpdate(
        { _id: accountId },
        account,
        { new: true }
    );

    return accountUpdated;
};

const makePartialPayment = async input => {
    const { accountId, amountPaid } = input;
    const account = await Account.findById(accountId);
    const result =
        amountPaid > account.value
            ? { errors: [dictionary.account.amountPaidIsInvalid] }
            : { errors: [] };

    if (result.errors.length) return result;

    const changedData = do {
        if (account.value == amountPaid)
            ({
                status: accountEnum.status.done,
                dueDate: accountsUtil.setAccountDate(
                    account.dueDate,
                    account.type
                )
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

const sendNext = async accountId => {
    const { type, dueDate } = await Account.findById(accountId);
    const adjustedDate = accountsUtil.setAccountDate(dueDate, type);
    const adjustedStatus = accountEnum.status.pending;
    const accountUpdated = await Account.findOneAndUpdate(
        { _id: accountId },
        { dueDate: adjustedDate, status: adjustedStatus },
        { new: true }
    );
    return accountUpdated;
};

export default {
    listAllAccounts,
    findAccounts,
    saveAccount,
    makePayment,
    deleteAccounts,
    editAccount,
    makePartialPayment,
    sendNext
};
