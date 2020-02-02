import { createAccount, findAccounts } from '../services';
import { AccountStatus } from '../helpers/enum';
import controller from './accounts';

jest.mock('../services');

const createdResponse = jest.fn();
const okResponse = jest.fn();

const ctx = {
    request: {},
    created: createdResponse,
    ok: okResponse,
};

let ctxMock;

describe('Controllers/Accounts', () => {
    beforeEach(() => {
        ctxMock = ctx;

        createdResponse.mockClear();
        okResponse.mockClear();
    });

    it('should the "create" function be called correctly', async () => {
        const accountCreatedMock = {
            name: 'Vivo',
            value: 400,
            amountPaid: 30,
            status: AccountStatus.pending,
            // ...
        };

        ctxMock.request.body = accountCreatedMock;

        createAccount.mockImplementation(() => Promise.resolve(accountCreatedMock));

        await controller.create(ctx);

        expect(createAccount).toHaveBeenCalledWith(ctx.request.body);
        expect(createdResponse).toHaveBeenCalledWith(accountCreatedMock);
    });

    it('should the "find" function be called correctly', async () => {
        const accountsMock = [{ name: 'Vivo', value: 400 }, { name: 'Banco', value: 2000 }];

        ctxMock.request.header = { name: 'Banco', sort: 'value', order: 'desc' };

        findAccounts.mockImplementation(() => Promise.resolve(accountsMock));

        await controller.find(ctxMock);

        expect(findAccounts).toHaveBeenCalledWith(ctx.request.header);
        expect(okResponse).toHaveBeenCalledWith(accountsMock);
    });
});
