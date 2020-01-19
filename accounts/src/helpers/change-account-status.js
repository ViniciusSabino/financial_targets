import { AccountStatus } from './enum';

const changeAccountStatus = (account) => {
    const { amountPaid, value, status } = account;

    if (amountPaid === value) return AccountStatus.done;

    return status;
};

export default changeAccountStatus;
