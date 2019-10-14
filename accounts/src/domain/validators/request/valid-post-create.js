import moment from 'moment';

import validSchema from '../schemas/account';
import dictionary from '../../../helpers/dictionaries';

export default (ctx, next) => {
    const { body } = ctx.request;

    // schema validate
    const validatedSchema = validSchema(body);

    if (Array.isArray(validatedSchema)) return ctx.badRequest(validatedSchema);

    const errors = [];

    // account validate
    if (moment(body.dueDate) > moment()) errors.push(dictionary.dueDateIsInvalid);

    if (body.amountPaid > body.value) errors.push(dictionary.amountPaidIsInvalid);

    if (errors.length) return ctx.badRequest(errors);

    ctx.account = body;

    return next();
};
