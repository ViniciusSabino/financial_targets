import AccountMongoService from '../../database/mongodb/accounts-mongo-service';

const editAccount = async (account) => await AccountMongoService.edit(account);

export default editAccount;
