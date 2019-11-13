import Account from '../../../models/Account';
import accountConstants from '../../../helpers/constants/account';
import dictionary from '../../../helpers/dictionaries/account';

const { status } = accountConstants;

export default async (ctx, next) => {
    const { amountPaid, id } = ctx.body;

    const errors = [];

    const unpaidAccount = await Account.findById(id).lean();

    if (unpaidAccount.status === status.done) errors.push(dictionary.amountPaidDone);

    if (amountPaid > unpaidAccount.value) errors.push(dictionary.amountPaidIsInvalid);

    if (errors.length) return ctx.badRequest(errors);

    ctx.unpaidAccount = unpaidAccount;

    return next();
};
