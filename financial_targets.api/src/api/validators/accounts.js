import moment from 'moment';

import dictionary from '../utils/dictionary';
import enumerator from '../utils/enumerators';

const validSave = (ctx, next) => {
  const account = ctx.request.body;
  const errors = [];

  const valueLimit = 5000;
  const currentDate = moment().format();

  if (!account.name) errors.push(dictionary.account.nameIsEmpty);

  if (!account.value) errors.push(dictionary.account.valueIsEmpty);
  else if (account.value > valueLimit) errors.push(dictionary.account.valueExceeded);

  if (!account.type) errors.push(dictionary.account.typeIsEmpty);

  if (!account.paymentForm) errors.push(dictionary.account.paymentFormIsEmpty);

  if (!account.dueDate) errors.push(dictionary.account.dueDateIsEmpty);

  if (account.amountPaid > account.value) errors.push(dictionary.account.amountPaidIsInvalid);

  if (!errors.length)
    //managing the status of the account payable
    account.status = account.amountPaid === account.value ? enumerator.account.status.done : account.dueDate < currentDate ? enumerator.account.status.expired : enumerator.account.status.pending;
  else return ctx.badRequest({ errors });

  ctx.request.body = account;

  return next();
};

export default {
  validSave
};
