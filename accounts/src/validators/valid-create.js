import moment from 'moment';

import accountSchema from './schemas/account-schema';
import { AccountErrors } from '../helpers/enum';

const validCreate = async (ctx, next) => {
    const { body } = ctx.request;
    const errors = [];

    try {
        await accountSchema.validateAsync(body);

        if (moment(body.dueDate).isAfter(moment())) errors.push(AccountErrors.dueDateIsInvalid);

        if (body.amountPaid > body.value) errors.push(AccountErrors.amountPaidIsInvalid);

        if (errors.length) return ctx.badRequest(errors);

        return next();
    } catch (error) {
        return ctx.badRequest(error);
    }
};

export default validCreate;
