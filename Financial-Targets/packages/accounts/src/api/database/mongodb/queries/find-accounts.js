import Account from '../models/account';

const constructorSort = (sort, order) => {
    const mongoOrder = {};

    mongoOrder[sort] = order === 'desc' ? -1 : 1;

    return mongoOrder;
};

const findAccounts = async ({ mongoFilter, sort, order, limit }) => {
    const accounts = await Account.find(mongoFilter)
        .sort(constructorSort(sort, order))
        .limit(Number(limit))
        .lean();

    return accounts;
};

export default findAccounts;
