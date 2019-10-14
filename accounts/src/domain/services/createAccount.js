import Account from '../../models/Account';

export default async (account) => {
    const accountSaved = await new Account(account).save();

    return accountSaved;
};
