import { accountEnum } from '../../utils/enumerators';
import Account from '../../database/mongodb/models/account';
import { setAccountDate } from '../common';

const mountsPaidAccounts = (unpaidAccounts) => {
    const payloadPaidBills = unpaidAccounts.map(({ dueDate, type, value }) => ({
        status: accountEnum.status.done,
        dueDate: setAccountDate(type, dueDate),
        amountPaid: value,
    }));

    return payloadPaidBills;
};

const makePaymentAccounts = async (accounts) => {
    const unpaidAccounts = accounts.filter((account) => account.status !== accountEnum.status.done);

    const payloadPaidBills = mountsPaidAccounts(unpaidAccounts);

    const tasks = payloadPaidBills.map((payload, index) =>
        Account.findOneAndUpdate({ _id: unpaidAccounts[index].id }, payload)
    );

    await Promise.all(tasks);
};

export default makePaymentAccounts;
