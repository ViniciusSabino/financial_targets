import { create } from '../services';
import { STATUS } from '../utils/enums';
import controller from './accounts';

jest.mock('../services');

const createdRes = jest.fn();
const okRes = jest.fn();

const ctx = {
    request: {},
    created: createdRes,
    ok: okRes,
};

let ctxMock;

describe('Controllers', () => {
    describe('Accounts', () => {
        beforeEach(() => {
            ctxMock = ctx;

            createdRes.mockClear();
            okRes.mockClear();
        });
        describe('Create', () => {
            it('should controller respond successfully', async () => {
                const accountCreatedMock = {
                    name: 'Vivo',
                    value: 400,
                    amountPaid: 30,
                    status: STATUS.pending,
                    // ...
                };

                ctxMock.request.body = accountCreatedMock;

                create.mockImplementation(() => Promise.resolve(accountCreatedMock));

                await controller.create(ctx);

                expect(create).toHaveBeenCalledWith(ctx.request.body);
                expect(createdRes).toHaveBeenCalledWith(accountCreatedMock);
            });
        });

        // it('find accounts', async () => {
        //     const accountsMock = [
        //         { name: 'Vivo', value: 400 },
        //         { name: 'Banco', value: 2000 },
        //     ];

        //     ctxMock.request.header = { name: 'Banco', sort: 'value', order: 'desc' };

        //     findAccounts.mockImplementation(() => Promise.resolve(accountsMock));

        //     await controller.find(ctxMock);

        //     expect(findAccounts).toHaveBeenCalledWith(ctx.request.header);
        //     expect(okResponse).toHaveBeenCalledWith(accountsMock);
        // });
    });
});
