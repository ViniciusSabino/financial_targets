import { setAccountAmountPaid, setAccountStatus, getNewAccountDate } from '../../helpers/accounts';

const adapterPartiallyPayment = (amountPaid, unpaidAccount) => {
    const updatedAmountPaid = setAccountAmountPaid(amountPaid, unpaidAccount);

    const updatedStatus = setAccountStatus(updatedAmountPaid, unpaidAccount);

    const updatedDueDate = getNewAccountDate(unpaidAccount.type, unpaidAccount.dueDate);

    return {
        amountPaid: updatedAmountPaid,
        status: updatedStatus,
        dueDate: updatedDueDate,
    };
};

export default adapterPartiallyPayment;
