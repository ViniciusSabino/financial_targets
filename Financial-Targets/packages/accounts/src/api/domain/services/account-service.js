import { setAccountDate } from './functions/account-functions';
import { accountEnum } from '../utils/enumerators';

const sendNext = async (accountId) => {
    const { type, dueDate } = await findAccountById(accountId);

    const adjustedDate = setAccountDate(dueDate, type);

    const accountUpdated = await findByIdAndUpdate(accountId, {
        dueDate: adjustedDate,
        status: accountEnum.status.pending,
    });

    return accountUpdated;
};

export default {
    sendNext,
};
