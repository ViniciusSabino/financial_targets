import Account from '../../database/mongodb/models/Account';
import create from './create';
import { STATUS } from '../../utils/enums';

jest.mock('../../database/mongodb/models/Account');

const accountMock = {
    name: 'Cartão de Crédito',
    value: 5000,
    status: STATUS.pending,
    dueDate: '2020-11-21 00:00:00.000',
    // ...
};

const expectedAccount = {
    ...accountMock,
    id: 123456,
};

const mongoCreate = jest.fn(() => expectedAccount);

describe('Services', () => {
    describe('Create', () => {
        it('should service respond successfully', async () => {
            jest.spyOn(Account, 'create').mockImplementation(mongoCreate);

            const account = await create(accountMock);

            expect(mongoCreate).toHaveBeenCalledWith(accountMock);
            expect(account).toEqual(expectedAccount);
        });
    });
});
