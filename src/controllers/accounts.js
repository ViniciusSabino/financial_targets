import * as service from '../services';

const create = async (ctx) => {
    const { body } = ctx.request;

    const created = await service.createAccount(body);

    return ctx.created(created);
};

const find = async (ctx) => {
    const { header } = ctx.request;

    const accounts = await service.findAccounts(header);

    return ctx.ok(accounts);
};

const partiallyPayment = async (ctx) => {
    const { unpaidAccount } = ctx.state;
    const { amountPaid: currentAmountPaid } = ctx.request.body;

    const updatedAccount = await service.partiallyPaymentAccount(currentAmountPaid, unpaidAccount);

    return ctx.ok(updatedAccount);
};

export default {
    create,
    find,
    partiallyPayment,
};
