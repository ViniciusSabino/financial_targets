import Account from '../models/account';

const findByIdAndUpdate = async (id, account) => {
    const accountUpdated = await Account.findByIdAndUpdate(id, account, { new: true }).lean();

    return accountUpdated;
};

export default findByIdAndUpdate;
