import { Document } from 'mongoose';

import AccountModel from '../database/mongodb/models/Account';
import { Account } from '../types';
import changeAccountStatus from '../helpers/change-account-status';
import changeAccountDueDate from '../helpers/change-account-due-date';

const createAccount = async (account: Account): Promise<Document> => {
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
