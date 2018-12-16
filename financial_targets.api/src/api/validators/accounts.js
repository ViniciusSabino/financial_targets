import moment from 'moment';

import dictionary from '../utils/dictionary';
import enumerators from '../utils/enumerators';

const validFindAllAccounts = (ctx, next) => {
  const { userid } = ctx.request.header;
  if (!userid) return ctx.badRequest({ errors: [dictionary.account.userIdIsEmpty] });
  return next();
};

const validSave = (ctx, next) => {
  const account = ctx.request.body;
  const errors = validDataSubmitted(account);
  const currentDate = moment().format();

  if (!errors.length)
    //managing the status of the account payable
    account.status = account.amountPaid === account.value ? enumerators.account.status.done : account.dueDate < currentDate ? enumerators.account.status.expired : enumerators.account.status.pending;
  else return ctx.badRequest({ errors });

  ctx.request.body = account;

  return next();
};

const validEdit = (ctx, next) => {
  const account = ctx.request.body;
  const errors = validDataSubmitted(account);
  const currentDate = moment().format();

  if (!errors.length) {
    if (account.dueDate < currentDate) return ctx.badRequest({ errors: [...errors, dictionary.account.dataEditIsInvalid] });
    account.status =
      (account.status === enumerators.account.status.expired && account.dueDate > currentDate) || (account.status === enumerators.account.status.done && account.amountPaid < account.value)
        ? enumerators.account.status.pending
        : account.status === enumerators.account.status.pending && account.amountPaid === account.value
          ? enumerators.account.status.done
          : account.status;
  } else return ctx.badRequest({ errors });

  ctx.request.body = account;

  return next();
};

const validDataSubmitted = account => {
  const errors = [];
  const valueLimit = 5000;
  const tagsLimit = 3;

  if (!account.name) errors.push(dictionary.account.nameIsEmpty);

  if (!account.value) errors.push(dictionary.account.valueIsEmpty);
  else if (account.value > valueLimit) errors.push(dictionary.account.valueExceeded);

  if (!account.type) errors.push(dictionary.account.typeIsEmpty);

  if (!account.paymentForm) errors.push(dictionary.account.paymentFormIsEmpty);

  if (!account.dueDate) errors.push(dictionary.account.dueDateIsEmpty);

  if (account.amountPaid > account.value) errors.push(dictionary.account.amountPaidIsInvalid);

  if (account.tags.length > tagsLimit) errors.push(dictionary.account.tagsIsExceeded);

  return errors;
};

export default {
  validFindAllAccounts,
  validSave,
  validEdit
};
