/* eslint-disable max-nested-callbacks */

import getStatusByAccount from './get-status-by-account';
import { ACCOUNT_STATUS, ERROR_CODES } from '../../utils/enums';

jest.mock('moment');

describe('create-account', () => {
    describe('helpers', () => {
        describe('get-status-by-account', () => {
            it('deve retornar o status "DONE" caso o valor pago seja igual ao valor da conta', () => {
                const status = getStatusByAccount({
                    amountPaid: 100,
                    value: 100,
                    status: ACCOUNT_STATUS.pending,
                });

                expect(status).toBe(ACCOUNT_STATUS.done);
            });

            it('deve retornar o status atual da conta caso o valor pago não seja igual ao valor da conta', () => {
                const account = {
                    amountPaid: 100,
                    value: 200,
                    status: ACCOUNT_STATUS.pending,
                };

                const status = getStatusByAccount(account);

                expect(status).toBe(account.status);
            });

            it('deve lançar um erro caso a conta não seja passada por parametro', () => {
                expect(() => {
                    getStatusByAccount();
                }).toThrow(ERROR_CODES.accountIsInvalid);
            });

            it('deve lançar um erro caso a conta não tenha uma das propriedades "amountPaid", "value" ou "status" preenchidas', () => {
                expect(() => {
                    getStatusByAccount({
                        status: ACCOUNT_STATUS.pending,
                    });
                }).toThrow(ERROR_CODES.accountIsInvalid);
            });
        });
    });
});
