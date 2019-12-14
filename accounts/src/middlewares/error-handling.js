import Youch from 'youch';

export default async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        const prettyError = await new Youch(error, ctx.request).toJSON();

        await ctx.internalServerError(prettyError);
    }
};
