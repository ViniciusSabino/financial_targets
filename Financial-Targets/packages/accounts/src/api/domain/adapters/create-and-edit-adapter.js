import { setTheStatus } from '../common';

const createAccountAdapter = (account) => ({
    ...account,
    status: setTheStatus(account.amountPaid, account.value),
});

export default createAccountAdapter;
