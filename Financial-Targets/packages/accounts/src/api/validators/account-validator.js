import { getCurrentDate } from '../utils/functions/dates';
import dictionary from '../utils/dictionaries/accounts';
import { accountEnum } from '../utils/enumerators';

const { status: ACCOUNT_STATUS } = accountEnum;

const validList = (ctx, next) => {
    const { userid } = ctx.request.header;
    return !userid ? ctx.badRequest({ errors: [dictionary.userIdIsEmpty] }) : next();
};

const validEdit = (ctx, next) => {
    const account = ctx.request.body;
    const errors = validDataSubmitted(account);
    const currentDate = getCurrentDate();

    if (!account._id) errors.push(dictionary.accountIdIsEmpty);

    if (!errors.length) {
        account.status = do {
            if (account.amountPaid === account.value) accountEnum.status.done;
            else if (account.dueDate > currentDate) accountEnum.status.pending;
            else accountEnum.status.expired;
        };
    } else return ctx.badRequest({ errors });

    ctx.request.body = account;

    return next();
};

const validMakePartialPayment = (ctx, next) => {
    const { accountId } = ctx.request.body;

    return !accountId ? ctx.badRequest({ errors: [dictionary.accountIdIsEmpty] }) : next();
};

export default {
    validList,
    validEdit,
    validMakePartialPayment,
};
