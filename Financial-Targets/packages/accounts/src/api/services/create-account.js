import { createAccount } from '../database/mongodb/queries';

export default async (account) => {
    await createAccount(account);
};
