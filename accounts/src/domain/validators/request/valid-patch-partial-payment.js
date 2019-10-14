import dictionaries from '../../../helpers/dictionaries';

export default (ctx, next) => {
    const { amountPaid, id } = ctx.request.body;

    const errors = [];

    if (!id) errors.push(dictionaries.accountIdIsEmpty);

    if (!Number(amountPaid)) errors.push(dictionaries.amountPaidIsEmpty);

    if (errors.length) return ctx.badRequest(errors);

    ctx.amountPaid = amountPaid;
    ctx.accountId = id;

    return next();
};
