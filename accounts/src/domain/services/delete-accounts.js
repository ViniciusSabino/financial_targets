import AccountMongoService from '../../database/mongodb/accounts-mongo-service';

export default async (accountsIds) => await AccountMongoService.delete(accountsIds);
