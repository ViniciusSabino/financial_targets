import { AccountStatus, Account } from '../types';

const changeAccountStatus = (account: Account): AccountStatus => {
    const { amountPaid, value, status } = account;

    if (amountPaid === value) return AccountStatus.done;

    return status;
};

export default changeAccountStatus;
