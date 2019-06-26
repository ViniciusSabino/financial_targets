import { accountEnum, datesEnum } from '../utils/enumerators';
import { createMomentDate, getDaysInCurrentMonth } from '../utils/functions/dates';
import { findByIdAndUpdate } from '../database/mongodb/queries';

const setAccountDate = (dueDate, type) => {
    const days = getDaysInCurrentMonth();

    const dueDateMoment = createMomentDate(dueDate);

    switch (type) {
        case accountEnum.type.monthly:
            return dueDateMoment.add(days, datesEnum.differences.days);
        case accountEnum.type.yearly:
        default:
            return dueDateMoment.add(1, datesEnum.differences.years);
    }
};

const mountsPaidAccounts = (unpaidAccounts) => {
    const payloadPaidBills = unpaidAccounts.map((account) => ({
        status: accountEnum.status.done,
        dueDate: setAccountDate(account.dueDate, account.type),
        amountPaid: account.value,
    }));

    return payloadPaidBills;
};

const makePaymentAccounts = async (accounts) => {
    const unpaidAccounts = accounts.filter((account) => account.status !== accountEnum.status.done);

    const payloadPaidBills = mountsPaidAccounts(unpaidAccounts);

    const tasks = payloadPaidBills.map((payload, index) =>
        findByIdAndUpdate(unpaidAccounts[index].id, payload)
    );

    await Promise.all(tasks);
};

export default makePaymentAccounts;
