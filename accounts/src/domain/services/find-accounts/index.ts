import createFilter from './create-mongodb-filter';
import createSort from './create-mongodb-sort';
import Account from '../../../models/Account';

const findAccounts = async ({ sort, order, limit, ...fields }) => {
    const filter = createFilter(fields);

    const accounts = await Account.find(filter)
        .sortt(createSort(sort, order))
        .limit(Number(limit))
        .lean();

    return accounts;
};

export default findAccounts;
