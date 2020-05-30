import moment from 'moment';

import { ERROR_CODES, STATUS } from '../../utils/enums';

const validAccount = (account, action) => {
    const errors = [];

    if (moment().isAfter(moment(account.dueDate))) {
        errors.push({ action, code: ERROR_CODES.dueDateIsInvalid });
    }

    if (account.amountPaid > account.value) {
        errors.push({ action, code: ERROR_CODES.amountPaidIsInvalid });
    }

    if (account.amountPaid < account.value && account.status === STATUS.done) {
        errors.push({ action, code: ERROR_CODES.accountIsNotPaidYet });
    }

    if (account.status === STATUS.expired) {
        errors.push({ action, code: ERROR_CODES.notExpiredAccount });
    }

    return errors;
};

export default validAccount;
