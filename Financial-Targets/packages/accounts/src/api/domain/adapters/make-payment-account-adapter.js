import { findAccounts } from '../../database/mongodb/queries';

const makePaymentAccountAdapter = async (accountsIds) => {
    const filter = { mongoFilter: { _id: accountsIds } };

    const accounts = await findAccounts(filter);

    return accounts.map(({ _id, status, value, type, dueDate }) => ({
        id: _id,
        status,
        value,
        type,
        dueDate,
    }));
};

export default makePaymentAccountAdapter;
