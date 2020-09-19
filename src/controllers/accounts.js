import * as service from '../services';

const create = async (ctx) => {
    const { body } = ctx.request;

    const account = await service.create(body);

    return ctx.created(account);
};

const find = async (ctx) => {
    const { header } = ctx.request;

    const accounts = await service.find(header);

    return ctx.ok(accounts);
};

const patch = async (ctx) => {
    const { body } = ctx.request;
    const { id } = ctx.request.params;
    const { currentAccount } = ctx.state;

    const account = await service.patch({ id, body, currentAccount });

    return ctx.ok(account);
};

export default {
    create,
    find,
    patch,
};
