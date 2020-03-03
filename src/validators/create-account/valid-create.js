import accountSchema from '../schemas/account-schema';
import validSaveAccount from '../common-validations/valid-save-account';

const validCreate = async (ctx, next) => {
    const { body } = ctx.request;

    try {
        await accountSchema.validateAsync(body);

        const errors = validSaveAccount(body);

        if (errors.length) return ctx.badRequest(errors);

        return next();
    } catch (error) {
        return ctx.badRequest(error);
    }
};

export default validCreate;
