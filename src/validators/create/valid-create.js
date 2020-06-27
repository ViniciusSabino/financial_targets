import accountSchema from '../schemas/account-schema';
import { validSaveRules } from '../shared';

const validCreate = async (ctx, next) => {
    const { body } = ctx.request;

    try {
        await accountSchema.validateAsync(body);

        const validation = validSaveRules(body, 'create');

        return validation.errors.length ? ctx.badRequest(validation) : next();
    } catch (error) {
        return ctx.badRequest(error);
    }
};

export default validCreate;
