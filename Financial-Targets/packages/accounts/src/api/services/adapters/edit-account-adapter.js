import accountEnum from '../../utils/enumerators/account-enum';

const setTheStatus = (amountPaid, value) =>
    amountPaid === value ? accountEnum.status.done : accountEnum.status.pending;

const editAccountAdapter = (account) => ({
    id: account.id,
    userId: account.userId,
    name: account.name,
    description: account.description,
    value: account.value,
    dueDate: account.dueDate,
    status: setTheStatus(account.amountPaid, account.value),
    amountPaid: account.amountPaid,
    type: account.type,
    paymentForm: account.paymentForm,
    isRepeat: account.isRepeat,
    tags: account.tags,
});

export default editAccountAdapter;
