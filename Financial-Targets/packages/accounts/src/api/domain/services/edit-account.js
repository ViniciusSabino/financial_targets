import { findByIdAndUpdate } from '../../database/mongodb/queries';

const editAccount = async ({ id, ...account }) => await findByIdAndUpdate(id, account);

export default editAccount;
