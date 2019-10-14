import Account from '../../models/Account';
import { setAccountStatus, setAccountDueDate } from '../common';

export default async (account) => {
    const status = setAccountStatus(account.amountPaid, account);

    const dueDate = setAccountDueDate(status, account);

    const accountSaved = await new Account({ ...account, status, dueDate }).save();

    return accountSaved;
};
