import Account from '../../models/Account';

const editAccount = async ({ id, ...account }) => {
    const accountUpdated = await Account.findOneAndUpdate({ _id: id }, account, {
        new: true,
    }).lean();

    return accountUpdated;
};

export default editAccount;
