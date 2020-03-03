import moment from 'moment';

import { AccountErrors, AccountStatus } from '../../helpers/enum';

const validAccount = (account) => {
    const errors = [];

    if (moment().isAfter(moment(account.dueDate))) {
        errors.push(AccountErrors.dueDateIsInvalid);
    }

    if (account.amountPaid > account.value) {
        errors.push(AccountErrors.amountPaidIsInvalid);
    }

    if (account.amountPaid < account.value && account.status === AccountStatus.done) {
        errors.push(AccountErrors.accountIsNotPaidYet);
    }

    return errors;
};

export default validAccount;
