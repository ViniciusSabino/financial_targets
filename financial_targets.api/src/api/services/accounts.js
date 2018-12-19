import Account from '../models/account';
import enumerators from '../utils/enumerators';
import dictionary from '../utils/dictionary';
import accountUtil from '../utils/accounts';

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
    const ajustedDate = accountUtil.setAccountDate(dueDate, type);
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

const makePartialPayment = async input => {
  const account = await Account.findOne({ _id: input.accountId });
  let data = input.amountPaid > account.value ? { errors: [dictionary.account.amountPaidIsInvalid] } : { errors: [] };
  if (data.errors.length) return data;
  const adjustedDate = accountUtil.setAccountDate(account.dueDate, account.type);
  const accountUpdated = await Account.findOneAndUpdate(
    { _id: input.accountId },
    { amountPaid: input.amountPaid, status: account.value == input.amountPaid ? enumerators.account.status.done : account.status, dueDate: adjustedDate },
    { new: true }
  );

  return { ...data, data: accountUpdated };
};

export default {
  listAllAccounts,
  saveAccount,
  makePayment,
  deleteAccounts,
  editAccount,
  makePartialPayment
};
