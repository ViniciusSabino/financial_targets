import { Context, Next } from 'koa';

import { AccountErrors } from '../types';

const validPatchPartiallyPayment = (ctx: Context, next: Next): Promise<void> => {
    const {
        id: accountId,
        amountPaid: currentAmountPaid,
    }: { id: string; amountPaid: number } = ctx.request.body;

    const errors: string[] = [];

    if (!accountId) errors.push(AccountErrors.accountIdIsEmpty);
    if (!currentAmountPaid) errors.push(AccountErrors.amountPaidIsEmpty);

    if (errors.length) return ctx.badRequest(errors);

    return next();
};

export default validPatchPartiallyPayment;
