import Account from './accounts-model';
import { constructorSort } from '../../domain/common';

const create = async (account) => await new Account(account).save();

const deleteMany = async (accountsIds) => await Account.deleteMany({ _id: accountsIds });

const edit = async ({ id, ...account }) => {
    const accountUpdated = await Account.findOneAndUpdate({ _id: id }, account, {
        new: true,
    }).lean();

    return accountUpdated;
};

const find = async ({ mongoFilter, sort, order, limit }) => {
    const accounts = await Account.find(mongoFilter)
        .sort(constructorSort(sort, order))
        .limit(Number(limit))
        .lean();

    return accounts;
};

const findByIdAndUpdate = async (id, dataChanges) => {
    const accountUpdated = await Account.findOneAndUpdate({ _id: id }, dataChanges, {
        new: true,
    }).lean();

    return accountUpdated;
};

export default {
    create,
    deleteMany,
    edit,
    find,
    findByIdAndUpdate,
};
