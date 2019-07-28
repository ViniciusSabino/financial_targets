import Account from '../../database/mongodb/models/account';

export default async (accountsIds) => await Account.deleteMany({ _id: accountsIds });
