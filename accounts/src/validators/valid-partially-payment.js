import AccountModel from '../database/mongodb/models/Account';
import { AccountStatus, AccountErrors } from '../helpers/enum';

export default async (ctx, next) => {
    const { id: accountId, amountPaid: currentAmountPaid } = ctx.request.body;

    const errors = [];

    const unpaidAccount = await AccountModel.findById(accountId);

    if (!unpaidAccount) return ctx.badRequest(AccountErrors.accountNotExists);

    if (unpaidAccount.status === AccountStatus.done) errors.push(AccountErrors.accountAlreadyPaid);

    if (currentAmountPaid > unpaidAccount.value) errors.push(AccountErrors.amountPaidIsInvalid);

    if (errors.length) return ctx.badRequest(errors);

    ctx.state.unpaidAccount = unpaidAccount;

    return next();
};
