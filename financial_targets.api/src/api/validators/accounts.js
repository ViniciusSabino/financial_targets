import moment from 'moment';

import dictionary from '../utils/dictionary';
import enumerators from '../utils/enumerators';

const accountStatus = enumerators.account.status;

const validFindAllAccounts = (ctx, next) => {
  const { userid } = ctx.request.header;
  if (!userid) return ctx.badRequest({ errors: [dictionary.account.userIdIsEmpty] });
  return next();
};

const validCreate = (ctx, next) => {
  const account = ctx.request.body;
  const errors = validDataSubmitted(account);
  const currentDate = moment().format();

  if (!errors.length) {
    //managing the status of the account payable
    account.status = do {
      if (account.amountPaid === account.value) accountStatus.done;
      else if (account.dueDate < currentDate) accountStatus.expired;
      else accountStatus.pending;
    };
  } else return ctx.badRequest({ errors });

  ctx.request.body = account;

  return next();
};

const validEdit = (ctx, next) => {
  const account = ctx.request.body;
  const errors = validDataSubmitted(account);
  const currentDate = moment().format();

  if (!errors.length) {
    if (account.dueDate < currentDate) return ctx.badRequest({ errors: [dictionary.account.dataEditIsInvalid] });
    account.status = do {
      if ((account.status === accountStatus.expired && account.dueDate > currentDate)
        || (account.status === accountStatus.done && account.amountPaid < account.value))
        accountStatus.pending;
      else if (account.status === accountStatus.pending && account.amountPaid === account.value)
        accountStatus.done;
      else account.status;
    };
  } else return ctx.badRequest({ errors });

  ctx.request.body = account;

  return next();
};

const validMakePartialPayment = (ctx, next) => {
  const { accountId } = ctx.request.body;

  if (!accountId) return ctx.badRequest({ errors: dictionary.account.accountIdIsEmpty });

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

  if (account.tags?.length > tagsLimit) errors.push(dictionary.account.tagsIsExceeded);

  return errors;
};

export default {
  validFindAllAccounts,
  validCreate,
  validEdit,
  validMakePartialPayment
};
