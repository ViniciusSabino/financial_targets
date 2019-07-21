import Account from '../models/account';

const createAccount = async (account) => await new Account(account).save();

export default createAccount;
