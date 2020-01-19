import moment from 'moment';

import { Account, AccountType, AccountStatus } from '../types';

const changeAccountDueDate = (account: Account): string => {
    const { status, type, dueDate } = account;

    if (status !== AccountStatus.done) return dueDate;

    const updatedDueDate =
        type === AccountType.monthly ? moment().add('months', 1) : moment().add('years', 1);

    return updatedDueDate.format();
};

export default changeAccountDueDate;
