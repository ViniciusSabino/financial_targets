import moment from 'moment';

import { ERROR_CODES, ACCOUNT_STATUS, ACCOUNT_TYPES } from '../../utils/enums';

const getDueDateByAccount = (account) => {
    if (!account) throw new Error(ERROR_CODES.accountIsInvalid);

    const { status, type, dueDate } = account;

    if (!status || !type || !dueDate) throw new Error(ERROR_CODES.accountIsInvalid);

    if (status !== ACCOUNT_STATUS.done) return dueDate;

    const calculate = {
        [ACCOUNT_TYPES.monthly]: (date) => moment(date).add('months', 1),
        [ACCOUNT_TYPES.yearly]: (date) => moment(date).add('years', 1),
    };

    const updatedDueDate = calculate[type](dueDate);

    return updatedDueDate.format();
};

export default getDueDateByAccount;
