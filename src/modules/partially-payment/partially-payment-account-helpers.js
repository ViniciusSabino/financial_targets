/* eslint-disable import/prefer-default-export */

import { getDueDateByAccount, getStatusByAccount, calculateNewAmountPaid } from '../shared';

const adapterPartiallyPayment = (currentAmountPaid, unpaidAccount) => {
    const updatedAmountPaid = calculateNewAmountPaid(currentAmountPaid, unpaidAccount);

    const updatedStatus = getStatusByAccount({ ...unpaidAccount, amountPaid: updatedAmountPaid });

    const updatedDueDate = getDueDateByAccount({ ...unpaidAccount, status: updatedStatus });

    return {
        amountPaid: updatedAmountPaid,
        status: updatedStatus,
        dueDate: updatedDueDate,
    };
};

export { adapterPartiallyPayment };
