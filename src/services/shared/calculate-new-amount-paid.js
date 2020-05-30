import { ERROR_CODES } from '../../utils/enums';

const calculateNewAmountPaid = (currentAmountPaid, unpaidAccount) => {
    if (!unpaidAccount || !currentAmountPaid) throw new Error(ERROR_CODES.accountIsInvalid);

    const { amountPaid, value } = unpaidAccount;

    if (!value) throw new Error(ERROR_CODES.accountIsInvalid);

    const updatedAmountPaid = amountPaid ? currentAmountPaid + amountPaid : currentAmountPaid;

    return updatedAmountPaid <= value ? updatedAmountPaid : value;
};

export default calculateNewAmountPaid;
