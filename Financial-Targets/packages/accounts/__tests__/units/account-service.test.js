import moment from 'moment';

import { findAccounts, findAccountById } from '../database/mongodb/queries';
import { getCurrentDate, getCurrentMonth, getCurrentYear } from '../utils/functions/dates';
import { setAccountDate } from './functions/account-functions';
import dictionary from '../utils/dictionaries';
import service from './account-service';

jest.mock('../database/mongodb/queries', () => ({
    findAccounts: jest.fn(),
    findAccountById: jest.fn(),
}));

jest.mock('../../../src/api/utils/functions/dates', () => ({
    getCurrentDate: jest.fn(),
    getCurrentMonth: jest.fn(),
    getCurrentYear: jest.fn(),
}));

jest.mock('./functions/account-functions', () => ({
    setAccountDate: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Services', () => {
    describe('GET -> /accounts, List All Accounts', () => {
        it('deve retornar o status "EXPIRED" quando a data para pagar for menor que a data atual, para a busca no mesmo mês que a conta', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'PENDING',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-10-11T03:24:00.000Z')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 10);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('EXPIRED');
            expect(response.data[0].dueDate).toEqual('2019-10-10T18:54:37.000Z');
            expect(response.data[0].amountPaid).toEqual(40);
        });

        it('deve retornar o status "EXPIRED" quando a data para pagar for menor que a data atual, para a busca no próximo mês com ela já expirada', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'PENDING',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-11-15T03:24:00.000Z')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 11);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('EXPIRED');
            expect(response.data[0].dueDate).toEqual('2019-11-10T18:54:37-02:00');
            expect(response.data[0].amountPaid).toEqual(0);
        });

        it('deve manter o status "PENDING" quando a data para pagar for menor que a data atual, para a busca no próximo mês com a conta ainda não expirada', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'PENDING',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-11-07T03:24:00.000')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 11);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('PENDING');
            expect(response.data[0].dueDate).toEqual('2019-11-10T18:54:37-02:00');
            expect(response.data[0].amountPaid).toEqual(0);
        });

        it('deve manter o status "EXPIRED" quando a conta estiver expirada e a busca for realizada no mesmo mês', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'EXPIRED',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-10-15T03:24:00.000')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 10);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('EXPIRED');
            expect(response.data[0].dueDate).toEqual('2019-10-10T18:54:37.000Z');
            expect(response.data[0].amountPaid).toEqual(40);
        });

        it('deve retornar o status "PENDING" quando a conta estiver expirada, mas ainda pendente no mês que a busca for realizada', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'EXPIRED',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-11-05T03:24:00.000')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 11);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('PENDING');
            expect(response.data[0].dueDate).toEqual('2019-11-10T18:54:37-02:00');
            expect(response.data[0].amountPaid).toEqual(0);
        });

        it('deve retornar o status "EXPIRED" quando a conta estiver expirada, mas ainda expirada no mês que a busca for realizada', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'EXPIRED',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-11-15T03:24:00.000')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 11);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('EXPIRED');
            expect(response.data[0].dueDate).toEqual('2019-11-10T18:54:37-02:00');
            expect(response.data[0].amountPaid).toEqual(0);
        });

        it('deve manter o status "DONE" quando a conta estiver paga e a busca for no mesmo mês', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'DONE',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-10-12T03:24:00.000')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 10);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('DONE');
            expect(response.data[0].dueDate).toEqual('2019-10-10T18:54:37.000Z');
            expect(response.data[0].amountPaid).toEqual(40);
        });

        it('deve mudar o status para "PENDING" quando a conta estiver paga, mas a busca realizada no mês seguinte com ela não expirada', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'DONE',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-11-07T03:24:00.000')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 11);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('PENDING');
            expect(response.data[0].dueDate).toEqual('2019-11-10T18:54:37-02:00');
            expect(response.data[0].amountPaid).toEqual(0);
        });

        it('deveria mudar o status para "EXPIRED" quando a conta estiver paga, mas a busca realizada no mês seguinte com ela já expirada', async () => {
            findAccounts.mockImplementation(() => [
                {
                    amountPaid: 40,
                    status: 'DONE',
                    dueDate: '2019-10-10T18:54:37.000Z',
                    type: 'MONTHLY',
                },
            ]);

            getCurrentDate.mockImplementation(() =>
                moment(new Date('2019-11-15T03:24:00.000')).format()
            );
            setAccountDate.mockImplementation(() =>
                moment(new Date('2019-11-10T18:54:37.000')).format()
            );

            getCurrentMonth.mockImplementation(() => 11);
            getCurrentYear.mockImplementation(() => 2019);

            const response = await service.listAll({
                userid: 1,
            });

            expect(response.data[0].status).toEqual('EXPIRED');
            expect(response.data[0].dueDate).toEqual('2019-11-10T18:54:37-02:00');
            expect(response.data[0].amountPaid).toEqual(0);
        });
    });
    describe('PATCH -> /accounts/makePartialPayment, Make partial payment', () => {
        it('deveria retornar um erro se a valor pago for maior que o valor da mensalidade', async () => {
            findAccountById.mockImplementation(() => ({
                amountPaid: 0,
                status: 'PENDING',
                value: 100,
                type: 'MONTHLY',
            }));

            const amountPaid = 120;
            const accountId = 1;

            const response = await service.makePartialPayment({ accountId, amountPaid });

            expect(response.errors.length).toEqual(1);
            expect(response.errors[0].message).toEqual(dictionary.amountPaidIsInvalid.message);
        });

        it('deveria retornar um erro caso tente pagar uma mensalidade que já se encontra em "DONE"', async () => {
            findAccountById.mockImplementation(() => ({
                amountPaid: 0,
                status: 'DONE',
                value: 100,
                type: 'MONTHLY',
            }));

            const amountPaid = 40;
            const accountId = 1;

            const response = await service.makePartialPayment({ accountId, amountPaid });

            expect(response.errors.length).toEqual(1);
            expect(response.errors[0].message).toEqual(dictionary.paymentDone.message);
        });
    });
});
