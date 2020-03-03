import { changeAccountStatus, changeAccountDueDate } from '../helpers/change-account';
import AccountModel from '../database/mongodb/models/Account';
import { createAccount } from './index';
import { AccountStatus } from '../helpers/enum';

jest.mock('../helpers/change-account');
jest.mock('../database/mongodb/models/Account');

const accountMock = {
    name: 'Cartão de Crédito',
    value: 5000,
    status: AccountStatus.pending,
    dueDate: '2020-11-21 00:00:00.000',
    // ...
};

describe('Services/createAccount', () => {
    it('deveria criar uma conta corretamente', async () => {
        changeAccountStatus.mockImplementation(() => AccountStatus.done);
        changeAccountDueDate.mockImplementation(() => '2020-12-21 00:00:00.000');

        const createMongoMock = jest.fn(() =>
            Promise.resolve({
                ...accountMock,
                status: AccountStatus.done,
                dueDate: '2020-12-21 00:00:00.000',
                _id: '123',
            })
        );

        jest.spyOn(AccountModel, 'create').mockImplementation(createMongoMock);

        const accountCreated = await createAccount(accountMock);

        expect(changeAccountStatus).toHaveBeenCalledWith(accountMock);

        expect(changeAccountDueDate).toHaveBeenCalledWith({
            ...accountMock,
            status: AccountStatus.done,
        });

        expect(createMongoMock).toHaveBeenCalledWith({
            ...accountMock,
            status: AccountStatus.done,
            dueDate: '2020-12-21 00:00:00.000',
        });

        expect(accountCreated).toEqual({
            ...accountMock,
            status: AccountStatus.done,
            dueDate: '2020-12-21 00:00:00.000',
            _id: '123',
        });
    });
});
