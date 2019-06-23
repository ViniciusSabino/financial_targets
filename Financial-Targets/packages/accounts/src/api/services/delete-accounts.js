import { deleteAccounts } from '../database/mongodb/queries';

export default async (accountsIds) => {
    await deleteAccounts(accountsIds);
};
