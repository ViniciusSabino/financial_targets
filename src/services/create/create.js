import AccountModel from '../../database/mongodb/models/Account';
import { getStatusByAccount, getDueDateByAccount } from '../shared';

const createAccount = async (account) => {
    const updatedStatus = getStatusByAccount(account);
    const updatedDueDate = getDueDateByAccount({ ...account, status: updatedStatus });

    const accountCreated = await AccountModel.create({
        ...account,
        status: updatedStatus,
        dueDate: updatedDueDate,
    });

    return accountCreated;
};

export default createAccount;
