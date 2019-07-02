import dictionaries from '../utils/dictionaries';

const validMakePartialPayment = (context, next) => {
    const {
        headers: { userid },
    } = context.request;

    const { amountPaid } = context.request.body;

    const errors = [];

    if (!Number(userid)) errors.push(dictionaries.userIdIsEmpty);

    if (!Number(amountPaid)) errors.push(dictionaries.amountPaidIsEmpty);

    return errors.length ? context.badRequest(errors) : next();
};

export default validMakePartialPayment;
