import Account from '../../database/mongodb/models/account';

export default async (account) => await new Account(account).save();
