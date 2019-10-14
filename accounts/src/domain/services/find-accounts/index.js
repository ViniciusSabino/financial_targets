import createFilter from './create-mongo-filter';
import constructorSort from './constructor-mongo-sort';
import Account from '../../../models/Account';

export default async ({ sort, order, limit, ...fields }) => {
    const filter = createFilter(fields);

    const accounts = await Account.find(filter)
        .sort(constructorSort(sort, order))
        .limit(Number(limit))
        .lean();

    return accounts;
};
