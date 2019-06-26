import { findAccounts } from '../../database/mongodb/queries';

const makePaymentAccountAdapter = async (accountsIds) => {
    const filter = { mongoFilter: { _id: accountsIds } };

    const accounts = await findAccounts(filter);

    return accounts.map((account) => ({
        id: account._id,
        status: account.status,
        value: account.value,
        type: account.type,
        dueDate: account.dueDate,
    }));
};

export default makePaymentAccountAdapter;
