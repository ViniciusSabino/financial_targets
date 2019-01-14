import Account from '../models/account';
import enumerators from '../utils/enumerators';
import dictionary from '../utils/dictionaries';
import accountsUtil from '../utils/accounts';

const accountStatus = enumerators.accounts.status;

const listAllAccounts = async userId => {
  const accounts = await Account.find({ userId });

  return {
    count: accounts.length,
    data: accounts
  };
};

const saveAccount = async account => {
  const accountSaved = new Account(account);
  return await accountSaved.save();
};

const makePayment = async accountsIds => {
  const accounts = await Account.find({ _id: accountsIds });
  const adjustedData = accounts.map(account => {
    const { value, type, _id, dueDate } = account;
    const ajustedDate = accountsUtil.setAccountDate(dueDate, type);

    return { _id, value, dueDate: ajustedDate, amountPaid: value, type };
  });

  adjustedData.forEach(async account => {
    const accountUpdate = { amountPaid: account.amountPaid, dueDate: account.dueDate, status: accountStatus.done };
    await Account.updateOne({ _id: account._id }, accountUpdate);
  });

  return adjustedData;
};

const deleteAccounts = async accountsIds => await Account.deleteMany({ _id: accountsIds });

const editAccount = async (accountId, account) => {
  const accountUpdated = await Account.findOneAndUpdate({ _id: accountId }, account, { new: true });
  return accountUpdated;
};

const makePartialPayment = async input => {
  const account = await Account.findById(input.accountId);
  const data = input.amountPaid > account.value ? { errors: [dictionary.account.amountPaidIsInvalid] } : { errors: [] };
  if (data.errors.length) return data;
  const adjustedDate = accountsUtil.setAccountDate(account.dueDate, account.type);
  const accountStatus = input.amountPaid ? accountStatus.done : account.status;
  const accountUpdated = await Account.findOneAndUpdate({ _id: input.accountId }, { amountPaid: input.amountPaid, status: account.value == accountStatus, dueDate: adjustedDate }, { new: true });

  return { ...data, data: accountUpdated };
};

const sendNext = async accountId => {
  const { type, dueDate } = await Account.findById(accountId);
  const adjustedDate = accountsUtil.setAccountDate(dueDate, type);
  const adjustedStatus = accountStatus.pending;
  const accountUpdated = await Account.findOneAndUpdate({ _id: accountId }, { dueDate: adjustedDate, status: adjustedStatus }, { new: true });
  return accountUpdated;
};

export default {
  listAllAccounts,
  saveAccount,
  makePayment,
  deleteAccounts,
  editAccount,
  makePartialPayment,
  sendNext
};
