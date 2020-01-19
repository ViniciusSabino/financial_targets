import AccountModel from '../database/mongodb/models/Account';
import { createMongoFilter, createMongoSort } from '../helpers/find-accounts';

const findAccounts = async ({ sort, order, limit, ...fields }) => {
    const filter = createMongoFilter(fields);
    const ordination = createMongoSort(sort, order);

    const accounts = await AccountModel.find(filter)
        .sort(ordination)
        .limit(limit);

    return accounts;
};

export default findAccounts;
