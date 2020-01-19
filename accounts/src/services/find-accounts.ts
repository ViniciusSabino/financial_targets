import { Document } from 'mongoose';
import AccountModel from '../database/mongodb/models/Account';
import { createMongoFilter, createMongoSort } from '../helpers/find-accounts';

const findAccounts = async ({
    sort,
    order,
    limit,
    ...fields
}: {
    sort: string;
    order: string;
    limit: number;
}): Promise<Document[]> => {
    const filter = createMongoFilter(fields);
    const ordination = createMongoSort(sort, order);

    const accounts = await AccountModel.find(filter)
        .sort(ordination)
        .limit(limit);

    return accounts;
};

export default findAccounts;
