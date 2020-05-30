import findAccounts from './find-accounts-service';
import AccountModel from '../../database/mongodb/models/Account';
import { createFilter, createSort } from './helpers';
import { ACCOUNT_STATUS } from '../../utils/enums';

jest.mock('./helpers');

const filterMock = {
    name: {
        $regex: 'Meu Vivo',
        $options: 'i',
    },
};

const sortMock = {
    value: -1,
};

const accountsMock = [
    { name: 'Meu Vivo', value: 200, isRepeat: true, status: ACCOUNT_STATUS.pending }, // ...more fields
];

createFilter.mockImplementation(() => filterMock);
createSort.mockImplementation(() => sortMock);

const findAccountsSpy = jest.spyOn(AccountModel, 'find').mockImplementation(() => accountsMock);

describe('modules', () => {
    describe('find-accounts', () => {
        describe('find-accounts-service', () => {
            it('chamada simples', async () => {
                const header = {
                    sort: 'value',
                    order: 'desc',
                    limit: 20,
                    name: 'Meu Vivo',
                    // ...more fields
                };

                const accounts = await findAccounts(header);

                expect(createFilter).toHaveBeenCalledWith({ name: 'Meu Vivo' });
                expect(createSort).toHaveBeenCalledWith(header.sort, header.order);
                expect(findAccountsSpy).toHaveBeenLastCalledWith(filterMock, null, {
                    sort: sortMock,
                    limit: header.limit,
                });

                expect(accounts).toEqual(accountsMock);
            });
        });
    });
});
