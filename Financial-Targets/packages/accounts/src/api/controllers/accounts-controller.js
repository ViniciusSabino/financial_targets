import service from '../services/account-service';
import * as adapters from '../services/adapters';

const create = async (context) => {
    const { body: account } = context.request;

    const adaptedAccount = adapters.createAccountAdapter(account);

    await service.create(adaptedAccount);

    return context.created();
};

const find = async (context) => {
    const { header: filters } = context.request;

    const accounts = await service.find(filters);

    return context.ok(accounts);
};

const listAll = async (context) => {
    const { header: filters } = context.request;

    const data = await service.listAll(filters);

    return context.ok(data);
};

const edit = async (context) => {
    const { body: account } = context.request;

    const editedAccount = await service.edit(account);

    return context.ok({ editedAccount });
};

const deleteAccounts = async (context) => {
    const { accountsIds } = context.request.body;

    await service.deleteAccounts(accountsIds);

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
    listAll,
    edit,
    deleteAccounts,
    makePayment,
    makePartialPayment,
    sendNext,
};
