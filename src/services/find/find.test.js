import find from './find';
import Account from '../../database/mongodb/models/Account';
import { createFilter, createSort } from './helpers';
import constants from '../../utils/constants';

jest.mock('./helpers');

describe('Services', () => {
    describe('find', () => {
        describe('find-accounts-service', () => {
            it('the call should be successful even if the filtering, sorting and limit parameters are not passed', async () => {
                createFilter.mockImplementation(() => ({}));
                createSort.mockImplementation(() => ({ field: -1 }));

                const findAccountsSpy = jest.spyOn(Account, 'find').mockImplementation(() => []);

                const header = {
                    // ...more header fields
                };

                await find(header);

                expect(createFilter).toHaveBeenCalledWith({});
                expect(createSort).toHaveBeenCalledWith({});

                expect(findAccountsSpy).toHaveBeenCalledWith({}, null, {
                    sort: { field: -1 },
                    limit: constants.find.DEFAULT_LIMIT,
                });
            });

            it('the call should be made successfully based on the filtering, sorting and limit fields', async () => {
                const filter = {
                    name: {
                        $eq: 'Vivo',
                    },
                };

                const sort = { name: -1 };

                const accountsMock = [
                    {
                        name: 'Meu Vivo',
                    },
                ];

                createFilter.mockImplementation(() => filter);
                createSort.mockImplementation(() => sort);

                const findAccountsSpy = jest
                    .spyOn(Account, 'find')
                    .mockImplementation(() => accountsMock);

                const header = {
                    sort: 'name',
                    order: 'desc',
                    limit: 20,
                    name: 'Vivo',
                };

                const accounts = await find(header);

                expect(createFilter).toHaveBeenCalledWith({ name: header.name });
                expect(createSort).toHaveBeenCalledWith({ sort: header.sort, order: header.order });

                expect(findAccountsSpy).toHaveBeenCalledWith(filter, null, {
                    sort,
                    limit: header.limit,
                });

                expect(accounts).toEqual(accountsMock);
            });
        });
    });
});
