import accountSchema from '../schemas/account-schema';
import { validSaveAccount } from '../shared';

const validCreate = async (ctx, next) => {
    const { body } = ctx.request;

    try {
        await accountSchema.validateAsync(body);

        const errors = validSaveAccount(body);

        return errors.length ? ctx.badRequest(errors) : next();
    } catch (error) {
        return ctx.badRequest(error);
    }
};

export default validCreate;
