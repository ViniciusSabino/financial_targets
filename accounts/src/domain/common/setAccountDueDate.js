import setAccountDate from './setAccountDate';
import { accountStatus } from '../../helpers/constants';

export default (updatedStatus, { type, dueDate }) => {
    if (updatedStatus === accountStatus.done) {
        return setAccountDate(type, dueDate);
    }

    return dueDate;
};
