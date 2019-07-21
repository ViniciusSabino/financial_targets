import * as services from '../domain/services';
import * as adapters from '../domain/adapters';

const create = async (context) => {
    const { body: account } = context.request;

    const adaptedAccount = adapters.createAccountAdapter(account);

    const accountCreated = await services.createAccount(adaptedAccount);

    return context.created(accountCreated);
};

const find = async (context) => {
    const { header: filters } = context.request;

    const accounts = await services.findAccounts(filters);

    return context.ok(accounts);
};

const edit = async (context) => {
    const { body: account } = context.request;

    const adaptedAccount = await adapters.editAccountAdapter(account);

    const editedAccount = await services.editAccount(adaptedAccount);

    return context.ok(editedAccount);
};

const deleteAccounts = async (context) => {
    const { accountsIds } = context.request.body;

    await services.deleteAccounts(accountsIds);

    return context.ok();
};

const makePayment = async (context) => {
    const { accountsIds } = context.request.body;

    const adaptedAccounts = await adapters.makePaymentAccountAdapter(accountsIds);

    await services.makePaymentAccounts(adaptedAccounts);

    return context.ok();
};

const makePartialPayment = async (context) => {
    const { body: paymentMade } = context.request;

    const adaptedAccount = await adapters.makePartialPaymentAccountAdapter(paymentMade);

    const updatedAccount = await services.makePartialPaymentAccount(adaptedAccount);

    return context.ok(updatedAccount);
};

const sendNext = async (context) => {
    const { body: account } = context.request;

    const updatedAccount = await services.sendNextAccounts(account);

    return context.ok(updatedAccount);
};

export default {
    create,
    find,
    edit,
    deleteAccounts,
    makePayment,
    makePartialPayment,
    sendNext,
};
