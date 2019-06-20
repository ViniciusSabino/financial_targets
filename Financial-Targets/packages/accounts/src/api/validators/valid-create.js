import validSchema from './schemas/account-schema';
import { getCurrentDate, createMomentDate } from '../utils/functions/dates';
import dictionary from '../utils/dictionaries/accountDictionary';

const validDataSubmitted = (account) => {
    const validatedAccount = validSchema(account);

    return validatedAccount;
};

const validAccount = (account) => {
    const currentDate = getCurrentDate();

    const errors = [];

    if (createMomentDate(account.dueDate) < currentDate) errors.push(dictionary.dueDateIsInvalid);

    if (account.amountPaid > account.value) errors.push(dictionary.amountPaidIsInvalid);

    return errors;
};

const validCreate = (context, next) => {
    const { body: account } = context.request;

    const validatedAccount = validDataSubmitted(account);

    if (Array.isArray(validatedAccount)) return context.badRequest(validatedAccount);

    const invalidAccountErrors = validAccount(account);

    if (invalidAccountErrors.length) return context.badRequest(invalidAccountErrors);

    return next();
};

export default validCreate;
