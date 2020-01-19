import { Context } from 'koa';

import * as service from '../services';

const create = async (ctx: Context): Promise<void> => {
    const { body } = ctx.request;

    const created = await service.createAccount(body);

    return ctx.created(created);
};

const find = async (ctx: Context): Promise<void> => {
    const { header } = ctx.request;

    const accounts = await service.findAccounts(header);

    return ctx.ok(accounts);
};

const partiallyPayment = async (ctx: Context): Promise<void> => {
    const { unpaidAccount } = ctx.state;
    const { amountPaid: currentAmountPaid }: { amountPaid: number } = ctx.request.body;

    const updatedAccount = await service.partiallyPaymentAccount(currentAmountPaid, unpaidAccount);

    return ctx.ok(updatedAccount);
};

export default {
    create,
    find,
    partiallyPayment,
};
