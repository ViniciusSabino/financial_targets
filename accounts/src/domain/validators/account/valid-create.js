import moment from 'moment';

import validateSchema from '../schemas';
import dictionary from '../../../utils/dictionaries/account';

const validCreate = (ctx, next) => {
    const { body } = ctx.request;

    const validatedSchema = validateSchema(body);

    if (Array.isArray(validatedSchema)) {
        return ctx.badRequest(validatedSchema);
    }

    const errors = [];

    if (moment(body.dueDate) < moment()) errors.push(dictionary.dueDateIsInvalid);

    if (body.amountPaid > body.value) errors.push(dictionary.amountPaidIsInvalid);

    if (errors.length) return ctx.badRequest(errors);

    return next();
};

export default validCreate;
