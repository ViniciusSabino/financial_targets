import * as services from '../domain/services';
import * as adapters from '../domain/adapters';

const create = async (context) => {
    const { body: account } = context.request;

    const adaptedAccount = adapters.createAccountAdapter(account);

    await services.createAccount(adaptedAccount);

    return context.created();
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

    const adaptedAccounts = await adapters.makePartialPaymentAccountAdapter(paymentMade);

    const account = await services.makePartialPaymentAccount(adaptedAccounts);

    return context.ok(account);
};

const sendNext = async (context) => {
    const { accountid } = context.request.header;

    const account = await service.sendNext(accountid);

    return context.ok({ account });
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
