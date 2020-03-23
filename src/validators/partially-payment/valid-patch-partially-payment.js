import { ERROR_CODES } from '../../utils/enums';

const validPatchPartiallyPayment = (ctx, next) => {
    const { id: accountId, amountPaid: currentAmountPaid } = ctx.request.body;

    const errors = [];

    if (!accountId) errors.push(ERROR_CODES.accountIdIsEmpty);
    if (!currentAmountPaid) errors.push(ERROR_CODES.amountPaidIsEmpty);

    if (errors.length) return ctx.badRequest(errors);

    return next();
};

export default validPatchPartiallyPayment;
