import { setAccountStatus, setAccountDueDate } from '../../common';

const setAmountPaid = (amountPaidNow, { amountPaid, value }) => {
    const updatedAmountPaid = amountPaid + amountPaidNow;

    if (updatedAmountPaid <= value) {
        return updatedAmountPaid;
    }

    return value;
};

export default (amountPaid, unpaidAccount) => {
    const updatedAmountPaid = setAmountPaid(amountPaid, unpaidAccount);

    const updatedStatus = setAccountStatus(updatedAmountPaid, unpaidAccount);

    const updatedDueDate = setAccountDueDate(updatedStatus, unpaidAccount);

    return {
        amountPaid: updatedAmountPaid,
        status: updatedStatus,
        dueDate: updatedDueDate,
    };
};
