import Account from '../../models/Account';
import { getNewAccountDate, setAccountStatus } from '../common/accounts';
import accountConstants from '../../utils/constants/account';

export default async (account) => {
    const status = setAccountStatus(account.amountPaid, account);

    // recalculate the date if already registered 'DONE'
    const dueDate =
        status === accountConstants.status.done
            ? getNewAccountDate(status, account)
            : account.dueDate;

    const accountCreate = new Account({ ...account, status, dueDate });

    await accountCreate.save();
};
