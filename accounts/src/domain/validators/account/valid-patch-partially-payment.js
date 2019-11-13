import dictionary from '../../../helpers/dictionaries/account';

const validPatchPartiallyPayment = (ctx, next) => {
    const { amountPaid, id } = ctx.request.body;

    const errors = [];

    if (!id) errors.push(dictionary.accountIdIsEmpty);

    if (!Number(amountPaid)) errors.push(dictionary.amountPaidIsEmpty);

    if (errors.length) return ctx.badRequest(errors);

    return next();
};

export default validPatchPartiallyPayment;
