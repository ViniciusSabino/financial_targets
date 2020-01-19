import { AccountErrors } from '../helpers/enum';

const validPatchPartiallyPayment = (ctx, next) => {
    const { id: accountId, amountPaid: currentAmountPaid } = ctx.request.body;

    const errors = [];

    if (!accountId) errors.push(AccountErrors.accountIdIsEmpty);
    if (!currentAmountPaid) errors.push(AccountErrors.amountPaidIsEmpty);

    if (errors.length) return ctx.badRequest(errors);

    return next();
};

export default validPatchPartiallyPayment;
