import { setAccountDate } from '../common';
import { accountEnum } from '../../utils/enumerators';
import Account from '../../database/mongodb/models/account';

const mountPayloadUpdate = ({ type, dueDate }) => ({
    amountPaid: 0,
    dueDate: setAccountDate(type, dueDate),
    status: accountEnum.status.pending,
});

const sendNextAccounts = async (account) => {
    const payloadUpdate = mountPayloadUpdate(account);

    const { _id } = account;

    const updatedAccount = await Account.findOneAndUpdate(_id, payloadUpdate, { new: true }).lean();

    return updatedAccount;
};

export default sendNextAccounts;
