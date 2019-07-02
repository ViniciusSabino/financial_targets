import { findByIdAndUpdate } from '../../database/mongodb/queries';

const editAccount = async ({ id, ...account }) => {
    const updatedAccount = await findByIdAndUpdate(id, account);

    return updatedAccount;
};

export default editAccount;
