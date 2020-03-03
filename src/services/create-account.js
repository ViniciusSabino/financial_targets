import AccountModel from '../database/mongodb/models/Account';
import { changeAccountStatus, changeAccountDueDate } from '../helpers/change-account';

const createAccount = async (account) => {
    const updatedStatus = changeAccountStatus(account);
    const updatedDueDate = changeAccountDueDate({ ...account, status: updatedStatus });

    const accountCreated = await AccountModel.create({
        ...account,
        status: updatedStatus,
        dueDate: updatedDueDate,
    });

    return accountCreated;
};

export default createAccount;
