/* eslint-disable import/prefer-default-export */
import AccountModel from '../database/mongodb/models/Account';

const setAccountState = async (ctx, next) => {
    const { id } = ctx.request.params;

    const account = await AccountModel.findById(id);

    ctx.state.account = account;

    return next();
};

export { setAccountState };
