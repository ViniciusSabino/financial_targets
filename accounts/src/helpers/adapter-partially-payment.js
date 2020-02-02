import {
    changeAccountAmountPaid,
    changeAccountStatus,
    changeAccountDueDate,
} from './change-account';

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
