import { getStatusByAccount, getDueDateByAccount } from '../shared';
import AccountModel from '../../database/mongodb/models/Account';
import createAccount from './create-account-service';
import { ACCOUNT_STATUS } from '../../utils/enums';

jest.mock('../shared');
jest.mock('../../database/mongodb/models/Account');

const accountMock = {
    name: 'Cartão de Crédito',
    value: 5000,
    status: ACCOUNT_STATUS.pending,
    dueDate: '2020-11-21 00:00:00.000',
    // ...
};

const expectedAccount = {
    ...accountMock,
    id: 123456,
    status: ACCOUNT_STATUS.done,
    dueDate: '2021-11-21 00:00:00.000',
};

describe('modules', () => {
    describe('create-account', () => {
        describe('create-account-service', () => {
            it('deve salvar uma nova conta no mongodb', async () => {
                getStatusByAccount.mockImplementation(() => ACCOUNT_STATUS.done);
                getDueDateByAccount.mockImplementation(() => '2021-11-21 00:00:00.000');

                const mongoCreate = jest.fn(() => expectedAccount);

                jest.spyOn(AccountModel, 'create').mockImplementation(mongoCreate);

                const account = await createAccount(accountMock);

                expect(getStatusByAccount).toHaveBeenCalledWith(accountMock);

                expect(getDueDateByAccount).toHaveBeenCalledWith({
                    ...accountMock,
                    status: ACCOUNT_STATUS.done,
                });

                expect(mongoCreate).toHaveBeenCalledWith({
                    ...accountMock,
                    status: ACCOUNT_STATUS.done,
                    dueDate: '2021-11-21 00:00:00.000',
                });

                expect(account).toEqual(expectedAccount);
            });
        });
    });
});
