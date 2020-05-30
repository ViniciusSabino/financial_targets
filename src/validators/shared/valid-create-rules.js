import moment from 'moment';

import { ERROR_CODES, STATUS } from '../../utils/enums';

const validAccount = (account) => {
    const errors = [];

    if (moment().isAfter(moment(account.dueDate))) errors.push(ERROR_CODES.dueDateIsInvalid);

    if (account.amountPaid > account.value) errors.push(ERROR_CODES.amountPaidIsInvalid);

    if (account.amountPaid < account.value && account.status === STATUS.done) {
        errors.push(ERROR_CODES.accountIsNotPaidYet);
    }

    return errors;
};

export default validAccount;
