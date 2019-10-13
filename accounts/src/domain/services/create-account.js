import AccountMongoService from '../../database/mongodb/accounts-mongo-service';

export default async (account) => await AccountMongoService.create(account);
