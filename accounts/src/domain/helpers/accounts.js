import moment from 'moment';

import accountConstants from '../../helpers/constants/account';

const getNewAccountDate = (type, dueDate) => {
    const days = moment().daysInMonth();

    if (type === accountConstants.type.monthly) {
        return moment(dueDate).add(days, 'days');
    }

    return moment(dueDate).add(1, 'years');
};

const setAccountStatus = (updatedAmountPaid, { value, status }) => {
    if (updatedAmountPaid === value) {
        return accountConstants.status.done;
    }

    return status;
};

export { getNewAccountDate, setAccountStatus };
