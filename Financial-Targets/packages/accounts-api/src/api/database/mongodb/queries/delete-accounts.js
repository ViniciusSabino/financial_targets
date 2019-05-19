import Account from '../models/account';

const deleteAccounts = async (ids) => {
    await Account.deleteMany({ _id: ids });
};

export default deleteAccounts;
