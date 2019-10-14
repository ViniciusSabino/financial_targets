import { accountStatus } from '../../helpers/constants';

export default (updatedAmountPaid, { value, status }) => {
    if (updatedAmountPaid === value) {
        return accountStatus.done;
    }

    return status;
};
