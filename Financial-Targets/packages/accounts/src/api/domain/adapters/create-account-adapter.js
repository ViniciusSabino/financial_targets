import accountEnum from '../../utils/enumerators/account-enum';

const setTheStatus = (amountPaid, value) =>
    amountPaid === value ? accountEnum.status.done : accountEnum.status.pending;

const createAccountAdapter = (account) => ({
    ...account,
    status: setTheStatus(account.amountPaid, account.value),
});

export default createAccountAdapter;
