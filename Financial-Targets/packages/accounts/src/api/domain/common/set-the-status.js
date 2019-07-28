import accountEnum from '../../utils/enumerators/account-enum';

const setTheStatus = (amountPaid, value) =>
    amountPaid === value ? accountEnum.status.done : accountEnum.status.pending;

export default setTheStatus;
