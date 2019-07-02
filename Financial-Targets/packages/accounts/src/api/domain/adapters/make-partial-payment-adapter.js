import { findAccountById } from '../../database/mongodb/queries';

const makePartialPaymentAdapter = async ({ accountId, amountPaid }) => {
    const account = await findAccountById(accountId);

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
