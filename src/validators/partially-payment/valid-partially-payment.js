import AccountModel from '../../database/mongodb/models/Account';
import { ACCOUNT_STATUS, ERROR_CODES } from '../../utils/enums';

export default async (ctx, next) => {
    const { id: accountId, amountPaid: currentAmountPaid } = ctx.request.body;

    const errors = [];

    const unpaidAccount = await AccountModel.findById(accountId);

    if (!unpaidAccount) return ctx.badRequest(ERROR_CODES.accountNotExists);

    if (unpaidAccount.status === ACCOUNT_STATUS.done) errors.push(ERROR_CODES.accountAlreadyPaid);

    if (currentAmountPaid > unpaidAccount.value) errors.push(ERROR_CODES.amountPaidIsInvalid);

    if (errors.length) return ctx.badRequest(errors);

    ctx.state.unpaidAccount = unpaidAccount;

    return next();
};
