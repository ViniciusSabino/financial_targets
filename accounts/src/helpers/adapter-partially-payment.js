import changeAccountAmountPaid from './change-account-amount-paid';
import changeAccountDueDate from './change-account-due-date';
import changeAccountStatus from './change-account-status';

const adapterPartiallyPayment = (currentAmountPaid, unpaidAccount) => {
    const updatedAmountPaid = changeAccountAmountPaid(currentAmountPaid, unpaidAccount);

    const updatedStatus = changeAccountStatus({ ...unpaidAccount, amountPaid: updatedAmountPaid });

    const updatedDueDate = changeAccountDueDate({ ...unpaidAccount, status: updatedStatus });

    return {
        amountPaid: updatedAmountPaid,
        status: updatedStatus,
        dueDate: updatedDueDate,
    };
};

export default adapterPartiallyPayment;
