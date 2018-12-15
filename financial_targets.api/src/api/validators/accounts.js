import moment from 'moment';

import dictionary from '../utils/dictionary';
import enumerator from '../utils/enumerators';

const validSave = (ctx, next) => {
  const account = ctx.request.body;
  const errors = [];

  const valueLimit = 5000;

  if (!account.name) errors.push(dictionary.account.nameIsEmpty);

  if (!account.description) errors.push(dictionary.account.descriptionIsEmpty);

  if (!account.value) errors.push(dictionary.account.valueIsEmpty);
  else if (account.value > valueLimit) errors.push(dictionary.account.valueExceeded);

  if (!account.dueDate) errors.push(dictionary.account.dueDateIsEmpty);
  else if (account.dueDate < moment().format('YYYY-MM-DD HH:mm:ss')) account.status = enumerator.account.status.expired;

  if (account.amountPaid > account.value) errors.push(dictionary.account.amountPaidIsInvalid);
  else if (account.amountPaid === account.value) account.status = enumerator.account.status.done;
  else account.status = enumerator.account.status.pending;

  if (!account.type) errors.push(dictionary.account.typeIsEmpty);

  if (!account.paymentForm) errors.push(dictionary.account.paymentFormIsEmpty);

  if (errors.length) return ctx.badRequest({ errors });

  ctx.request.body = account;

  return next();
};

export default {
  validSave
};
