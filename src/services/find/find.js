import AccountModel from '../../database/mongodb/models/Account';
import { createFilter, createSort } from './helpers';

const find = async ({ sort, order, limit, ...fields }) => {
    const filter = createFilter(fields);
    const ordination = createSort(sort, order);

    const accounts = await AccountModel.find(filter, null, {
        sort: ordination,
        limit,
    });

    return accounts;
};

export default find;
