import moment from 'moment';

import accountConstants from '../../helpers/constants/account';

const getNewAccountDate = (type, dueDate) => {
    const days = moment().daysInMonth();

    if (type === accountConstants.type.monthly) {
        return moment(dueDate).add(days, 'days');
    }

    return moment(dueDate).add(1, 'years');
};

const setAccountStatus = (amountPaid, unpaidAccount) => {
    const { value, status } = unpaidAccount;

    if (amountPaid === value) {
        return accountConstants.status.done;
    }

    return status;
};

const setAccountAmountPaid = (currentAmountPaid, unpaidAccount) => {
    const { amountPaid, value } = unpaidAccount;

    const updatedAmountPaid = currentAmountPaid + amountPaid;

    if (updatedAmountPaid <= value) {
        return updatedAmountPaid;
    }

    return value;
};

export { getNewAccountDate, setAccountStatus, setAccountAmountPaid };
