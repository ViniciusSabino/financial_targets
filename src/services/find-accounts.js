import AccountModel from '../database/mongodb/models/Account';
import { createFilter, createSort } from '../helpers/find-accounts';

const findAccounts = async ({ sort, order, limit, ...fields }) => {
    const filter = createFilter(fields);
    const ordination = createSort(sort, order);

    const accounts = await AccountModel.find(filter)
        .sort(ordination)
        .limit(limit);

    return accounts;
};

export default findAccounts;
