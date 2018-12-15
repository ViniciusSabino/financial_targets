import Account from '../models/account';

const saveAccount = async input => {
  const account = new Account(input);
  await account.save();
};

export default {
  saveAccount
};
