import Account from '../models/account';
import enumerators from '../utils/enumerators';
import moment from 'moment';

const listAllAccounts = async userId => {
  const accounts = await Account.find({ userId });
  return accounts;
};

const saveAccount = async input => {
  const account = new Account(input);
  await account.save();
};

const makePayment = async accountsIds => {
  const ids = accountsIds;
  const accounts = await Account.find({ _id: ids });
  const adjustedData = accounts.map(account => {
    const { value, type, _id, dueDate } = account;
    const days = moment().daysInMonth();
    const dueDateMoment = moment(dueDate);
    const ajustedDate = type === enumerators.account.type.monthly ? dueDateMoment.add(days, 'days') : dueDateMoment.add(12, 'months');
    return { _id, value, dueDate: ajustedDate, amountPaid: value, type };
  });
  adjustedData.forEach(async account => {
    await Account.updateOne({ _id: account._id }, { amountPaid: account.amountPaid, dueDate: account.dueDate, status: enumerators.account.status.done });
  });

  return adjustedData;
};

const deleteAccounts = async accountsIds => await Account.deleteMany({ _id: accountsIds });

const editAccount = async (accountId, account) => {
  const accountUpdated = await Account.findOneAndUpdate({ _id: accountId }, account, { new: true });
  return accountUpdated;
};

export default {
  listAllAccounts,
  saveAccount,
  makePayment,
  deleteAccounts,
  editAccount
};
