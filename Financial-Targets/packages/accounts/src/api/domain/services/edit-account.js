import Account from '../../database/mongodb/models/account';

const editAccount = async ({ id, ...account }) => {
    const accountUpdated = await Account.findOneAndUpdate({ _id: id }, account, {
        new: true,
    }).lean();

    return accountUpdated;
};

export default editAccount;
