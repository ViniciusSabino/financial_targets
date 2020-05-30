import Account from '../../database/mongodb/models/Account';

const createAccount = async (account) => {
    const created = await Account.create(account);

    return created;
};

export default createAccount;
