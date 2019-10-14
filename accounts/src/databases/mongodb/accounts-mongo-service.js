import Account from './accounts-model';
import { constructorSort } from '../../domain/common';

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
