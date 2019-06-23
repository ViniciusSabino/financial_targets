import dictionary from '../utils/dictionaries/accounts';

const validMakePartialPayment = (ctx, next) => {
    const { accountId } = ctx.request.body;

    return !accountId ? ctx.badRequest({ errors: [dictionary.accountIdIsEmpty] }) : next();
};

export default {
    validMakePartialPayment,
};
