import Account from '../../../models/Account';
import { accountStatus } from '../../../helpers/constants';
import dictionaries from '../../../helpers/dictionaries';

export default async (ctx, next) => {
    const { amountPaid, accountId } = ctx;

    const errors = [];

    const unpaidAccount = await Account.findById(accountId).lean();

    if (unpaidAccount.status === accountStatus.done) errors.push(dictionaries.amountPaidDone);

    if (amountPaid > unpaidAccount.amountPaid) errors.push(dictionaries.amountPaidIsInvalid);

    if (errors.length) return ctx.badRequest(errors);

    ctx.unpaidAccount = unpaidAccount;

    return next();
};
