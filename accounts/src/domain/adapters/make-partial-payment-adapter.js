import Account from '../../database/mongodb/accounts-model';

const makePartialPaymentAdapter = async ({ accountId, amountPaid }) => {
    const account = await Account.findOne({ _id: accountId }).lean();

    if (account) {
        return {
            id: account._id,
            status: account.status,
            value: account.value,
            type: account.type,
            dueDate: account.dueDate,
            amountPaid: account.amountPaid,
            amountPaidNow: amountPaid,
        };
    }

    return {};
};

export default makePartialPaymentAdapter;
