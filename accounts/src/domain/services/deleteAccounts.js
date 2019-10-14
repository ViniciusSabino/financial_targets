import Account from '../../models/Account';

export default async (ids) => {
    await Account.deleteMany({ _id: ids });
};
