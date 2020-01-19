import AccountModel from '../database/mongodb/models/Account';
import changeAccountStatus from '../helpers/change-account-status';
import changeAccountDueDate from '../helpers/change-account-due-date';

const createAccount = async (account) => {
    const updatedStatus = changeAccountStatus(account);
    const updatedDueDate = changeAccountDueDate(account);

    const accountCreated = await AccountModel.create({
        ...account,
        status: updatedStatus,
        dueDate: updatedDueDate,
    });

    return accountCreated;
};

export default createAccount;
