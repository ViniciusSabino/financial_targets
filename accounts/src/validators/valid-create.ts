import moment from 'moment';

import { Context, Next } from 'koa';
import accountSchema from './schemas/account-schema';
import { AccountErrors } from '../types';

const validCreate = async (ctx: Context, next: Next): Promise<void> => {
    const { body } = ctx.request;
    const errors: string[] = [];

    try {
        await accountSchema.validateAsync(body);

        if (moment(body.dueDate) < moment()) errors.push(AccountErrors.dueDateIsInvalid);

        if (body.amountPaid && body.amountPaid > body.value) {
            errors.push(AccountErrors.amountPaidIsInvalid);
        }

        if (errors.length) return ctx.badRequest(errors);

        return next();
    } catch (error) {
        return ctx.badRequest(error);
    }
};

export default validCreate;
