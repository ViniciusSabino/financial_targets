import { ERROR_CODES, ACCOUNT_STATUS } from '../../utils/enums';

const getStatusByAccount = (account) => {
    if (!account) throw new Error(ERROR_CODES.accountIsInvalid);

    const { amountPaid, value, status } = account;

    if (!amountPaid || !value || !status) throw new Error(ERROR_CODES.accountIsInvalid);

    return amountPaid === value ? ACCOUNT_STATUS.done : status;
};

export default getStatusByAccount;
