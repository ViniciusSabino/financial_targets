import Account from '../models/account';

const findAccountById = async (id) => {
    await Account.findById(id).lean();
};

export default findAccountById;
