import { setAccountAmountPaid, setAccountStatus, getNewAccountDate } from '../../helpers/accounts';

/**
 * Return all the fields that will be required to partially update the
 * amount paid
 *
 * @param {int} amountPaid
 * @param {Account} unpaidAccount
 */
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
