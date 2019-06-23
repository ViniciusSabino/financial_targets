import * as services from '../services';
import * as adapters from '../services/adapters';

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

    const adptedAccount = await adapters.editAccountAdapter(account);

    const editedAccount = await services.editAccount(adptedAccount);

    return context.ok(editedAccount);
};

const deleteAccounts = async (context) => {
    const { accountsIds } = context.request.body;

    await services.deleteAccounts(accountsIds);

    return context.ok();
};

const makePayment = async (context) => {
    const { accountsIds } = context.request.body;

    const paidBills = await service.makePayment(accountsIds);

    return context.ok({ paidBills });
};

const makePartialPayment = async (context) => {
    const { body: paymentMade } = context.request;

    const accounts = await service.makePartialPayment(paymentMade);

    return accounts.errors.length ? context.badRequest(accounts) : context.ok(accounts);
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
