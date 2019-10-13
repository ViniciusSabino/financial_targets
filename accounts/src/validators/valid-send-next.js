import Account from '../database/mongodb/models/account';
import dictionary from '../utils/dictionaries';
import { accountEnum } from '../utils/enumerators';
import { getCurrentMonthOrADate, getCurrentYearOrADate } from '../utils/functions/dates';

const validSendNext = async (context, next) => {
    const { accountId } = context.request.body;

    const errors = [];

    if (!accountId) {
        errors.push(dictionary.accountIdIsEmpty);

        return context.badRequest(errors);
    }

    const account = await Account.findById(accountId).lean();

    const { type, dueDate } = account;

    if (type === accountEnum.type.monthly) {
        const currentMonthly = getCurrentMonthOrADate();
        const accountMonth = getCurrentMonthOrADate(dueDate);

        if (accountMonth > currentMonthly) {
            errors.push(dictionary.sendToNextMonthInvalid);

            return context.badRequest(errors);
        }
    }
    // type === yearly
    else {
        const currentYear = getCurrentYearOrADate();
        const accountYear = getCurrentYearOrADate(dueDate);

        if (accountYear > currentYear) {
            errors.push(dictionary.sendToNextYearInvalid);

            return context.badRequest(errors);
        }
    }
    context.request.body = account;

    return next();
};

export default validSendNext;
