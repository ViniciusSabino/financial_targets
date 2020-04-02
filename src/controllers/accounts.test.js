import createAccount from '../modules/create-account/create-account-service';
import findAccounts from '../modules/find-accounts/find-accounts-service';
import { ACCOUNT_STATUS } from '../utils/enums';
import controller from './accounts';

jest.mock('../modules/create-account/create-account-service');
jest.mock('../modules/find-accounts/find-accounts-service');

const createdResponse = jest.fn();
const okResponse = jest.fn();

const ctx = {
    request: {},
    created: createdResponse,
    ok: okResponse,
};

let ctxMock;

describe('controllers', () => {
    describe('accounts', () => {
        beforeEach(() => {
            ctxMock = ctx;

            createdResponse.mockClear();
            okResponse.mockClear();
        });

        it('create account', async () => {
            const accountCreatedMock = {
                name: 'Vivo',
                value: 400,
                amountPaid: 30,
                status: ACCOUNT_STATUS.pending,
                // ...
            };

            ctxMock.request.body = accountCreatedMock;

            createAccount.mockImplementation(() => Promise.resolve(accountCreatedMock));

            await controller.create(ctx);

            expect(createAccount).toHaveBeenCalledWith(ctx.request.body);
            expect(createdResponse).toHaveBeenCalledWith(accountCreatedMock);
        });

        it('find accounts', async () => {
            const accountsMock = [
                { name: 'Vivo', value: 400 },
                { name: 'Banco', value: 2000 },
            ];

            ctxMock.request.header = { name: 'Banco', sort: 'value', order: 'desc' };

            findAccounts.mockImplementation(() => Promise.resolve(accountsMock));

            await controller.find(ctxMock);

            expect(findAccounts).toHaveBeenCalledWith(ctx.request.header);
            expect(okResponse).toHaveBeenCalledWith(accountsMock);
        });
    });
});
