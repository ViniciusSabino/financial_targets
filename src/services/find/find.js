import AccountModel from '../../database/mongodb/models/Account';
import { createFilter, createSort } from './helpers';
import constants from '../../utils/constants';

const find = async ({ sort, order, limit, ...fields }) => {
    const filter = createFilter(fields);
    const ordination = createSort({ sort, order });

    const accounts = await AccountModel.find(filter, null, {
        sort: ordination,
        limit: limit || constants.find.DEFAULT_LIMIT,
    });

    return accounts;
};

export default find;
