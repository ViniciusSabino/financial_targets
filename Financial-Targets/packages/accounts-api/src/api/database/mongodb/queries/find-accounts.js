import Account from "../models/account";
import search from "../../../utils/functions/search";

const findAccounts = async ({ filter, sort, order, limit }) => {
    const accounts = await Account.find(filter)
        .sort(search.sortBy(order, sort))
        .limit(Number(limit))
        .lean();

    return accounts;
};

export default findAccounts;
