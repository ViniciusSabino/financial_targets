import service from '../domain/services';

const create = async (ctx) => {
    const { body } = ctx;

    const accountCreated = await service.createAccount(body);

    return ctx.created(accountCreated);
};

const find = async (ctx) => {
    const { header } = ctx.request;

    const accounts = await service.findAccounts(header);

    return ctx.ok(accounts);
};

const partiallyPayment = async (ctx) => {
    const {
        unpaidAccount,
        body: { amountPaid },
    } = ctx;

    const updatedAccount = await service.partiallyPayment(amountPaid, unpaidAccount);

    return ctx.ok(updatedAccount);
};

export default {
    create,
    find,
    partiallyPayment,
};
