import moment from 'moment';

import accountConstants from '../../utils/constants/account';

/**
 * Calculates the new account payment date based on its type
 *
 * @param {string} type
 * @param {string} dueDate
 */
const getNewAccountDate = (type, dueDate) => {
    const days = moment().daysInMonth();

    if (type === accountConstants.type.monthly) {
        return moment(dueDate).add(days, 'days');
    }

    return moment(dueDate).add(1, 'years');
};

/**
 * Returns a new account status based on the amount paid
 *
 * @param {int} amountPaid
 * @param {Account} unpaidAccount
 */
const setAccountStatus = (amountPaid, unpaidAccount) => {
    const { value, status } = unpaidAccount;

    if (amountPaid === value) {
        return accountConstants.status.done;
    }

    return status;
};

/**
 * Take the current account and add in the amount that was partially paid
 *
 * @param {int} currentAmountPaid
 * @param {Account} unpaidAccount
 */
const setAccountAmountPaid = (currentAmountPaid, unpaidAccount) => {
    const { amountPaid, value } = unpaidAccount;

    const updatedAmountPaid = currentAmountPaid + amountPaid;

    if (updatedAmountPaid <= value) {
        return updatedAmountPaid;
    }

    return value;
};

export { getNewAccountDate, setAccountStatus, setAccountAmountPaid };
