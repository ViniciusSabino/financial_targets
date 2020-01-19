import moment from 'moment';

import { AccountType, AccountStatus } from './enum';

const changeAccountDueDate = (account) => {
    const { status, type, dueDate } = account;

    if (status !== AccountStatus.done) return dueDate;

    const updatedDueDate =
        type === AccountType.monthly ? moment().add('months', 1) : moment().add('years', 1);

    return updatedDueDate.format();
};

export default changeAccountDueDate;
