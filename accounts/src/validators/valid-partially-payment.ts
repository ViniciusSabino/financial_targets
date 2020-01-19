import { Context, Next } from 'koa';

import AccountModel from '../database/mongodb/models/Account';
import { AccountStatus, AccountErrors } from '../types';

export default async (ctx: Context, next: Next): Promise<void> => {
    const {
        id: accountId,
        amountPaid: currentAmountPaid,
    }: { id: string; amountPaid: number } = ctx.request.body;

    const errors: string[] = [];

    const unpaidAccount = await AccountModel.findById(accountId);

    if (!unpaidAccount) return ctx.badRequest(AccountErrors.accountNotExists);

    if (unpaidAccount.status === AccountStatus.done) errors.push(AccountErrors.accountAlreadyPaid);

    if (currentAmountPaid > unpaidAccount.value) errors.push(AccountErrors.amountPaidIsInvalid);

    if (errors.length) return ctx.badRequest(errors);

    ctx.state.unpaidAccount = unpaidAccount;

    return next();
};
