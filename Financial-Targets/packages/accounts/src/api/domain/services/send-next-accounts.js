import { setAccountDate } from '../common';
import { accountEnum } from '../../utils/enumerators';
import { findByIdAndUpdate } from '../../database/mongodb/queries';

const mountPayloadUpdate = ({ type, dueDate }) => ({
    amountPaid: 0,
    dueDate: setAccountDate(type, dueDate),
    status: accountEnum.status.pending,
});

const sendNextAccounts = async (account) => {
    const payloadUpdate = mountPayloadUpdate(account);

    const { _id } = account;

    const updatedAccount = await findByIdAndUpdate(_id, payloadUpdate);

    return updatedAccount;
};

export default sendNextAccounts;
