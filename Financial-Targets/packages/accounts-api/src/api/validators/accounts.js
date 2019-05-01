import { getCurrentDate } from "../utils/functions/dates";
import dictionary from "../utils/dictionaries/accounts";
import { accountEnum } from "../utils/enumerators";

const accountStatus = accountEnum.status;

const validDataSubmitted = (account) => {
    const errors = [];

    if (!account?.name) errors.push(dictionary.nameIsEmpty);

    if (!account?.value || account.value < 0) errors.push(dictionary.valueIsEmpty);

    if (!account?.type) errors.push(dictionary.typeIsEmpty);

    if (!account?.paymentForm) errors.push(dictionary.paymentFormIsEmpty);

    if (!account?.dueDate) errors.push(dictionary.dueDateIsEmpty);

    if (account?.amountPaid > account?.value) errors.push(dictionary.amountPaidIsInvalid);
    else if (account?.amountPaid < 0) errors.push(dictionary.amoountPaidIsNegative);

    if (!account?.userId) errors.push(dictionary.userIdIsEmpty);

    return errors;
};

const validCreate = (ctx, next) => {
    const account = ctx.request.body;

    const errors = validDataSubmitted(account);

    const currentDate = getCurrentDate();

    if (!errors.length) {
        account.status = do {
            if (account.amountPaid === account.value) accountStatus.done;
            else if (account.dueDate < currentDate) accountStatus.expired;
            else accountStatus.pending;
        };
    } else return ctx.badRequest({ errors });

    ctx.request.body = account;

    return next();
};

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
        if (account.dueDate < currentDate)
            return ctx.badRequest({
                errors: [dictionary.dataEditIsInvalid],
            });
        account.status = do {
            if (
                (account.status === accountStatus.expired && account.dueDate > currentDate) ||
                (account.status === accountStatus.done && account.amountPaid < account.value)
            )
                accountStatus.pending;
            else if (
                account.status === accountStatus.pending &&
                account.amountPaid === account.value
            )
                accountStatus.done;
            else account.status;
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
    validCreate,
    validList,
    validEdit,
    validMakePartialPayment,
    validDataSubmitted,
};
