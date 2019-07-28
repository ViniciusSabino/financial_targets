import Account from '../../database/mongodb/models/account';
import { constructorSort } from '.';

const findAccounts = async ({ mongoFilter, sort, order, limit }) => {
    const accounts = await Account.find(mongoFilter)
        .sort(constructorSort(sort, order))
        .limit(Number(limit))
        .lean();

    return accounts;
};

export default findAccounts;
