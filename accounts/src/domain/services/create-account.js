import Account from '../../models/Account';
import { getNewAccountDate, setAccountStatus } from '../helpers/accounts';
import accountConstants from '../../helpers/constants/account';

export default async (account) => {
    const status = setAccountStatus(account.amountPaid, account);

    const dueDate =
        status === accountConstants.status.done
            ? getNewAccountDate(status, account)
            : account.dueDate;

    const accountCreate = new Account({ ...account, status, dueDate });

    await accountCreate.save();
};
