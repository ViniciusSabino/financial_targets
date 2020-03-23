/* eslint-disable max-nested-callbacks */

import moment from 'moment';

import getDueDateByAccount from './get-duedate-by-account';
import { ACCOUNT_STATUS, ERROR_CODES, ACCOUNT_TYPES } from '../../utils/enums';

jest.mock('moment');

describe('modules', () => {
    describe('shared', () => {
        describe('getDueDateByAccount', () => {
            const formatFn = jest.fn();

            const addFn = jest.fn(() => ({
                format: formatFn,
            }));

            moment.mockImplementation(() => ({
                add: addFn,
            }));

            it('deve retornar a data atual de pagamento da conta caso o status seja diferente de "DONE"', () => {
                const account = {
                    status: ACCOUNT_STATUS.pending,
                    type: ACCOUNT_TYPES.monthly,
                    dueDate: '2020-11-21 00:00:00.000',
                };

                const dueDate = getDueDateByAccount(account);

                expect(addFn).not.toHaveBeenCalled();
                expect(formatFn).not.toHaveBeenCalled();
                expect(dueDate).toBe(account.dueDate);
            });

            it('deve retornar a data acrescendando + 1 mês caso o tipo da conta seja "MONTHLY" e o status "DONE"', () => {
                getDueDateByAccount({
                    status: ACCOUNT_STATUS.done,
                    type: ACCOUNT_TYPES.monthly,
                    dueDate: '2020-11-21 00:00:00.000',
                });

                expect(addFn).toHaveBeenCalledWith('months', 1);
                expect(formatFn).toHaveBeenCalled();
            });
            it('deve retornar a data acrescendando + 1 ano caso o tipo da conta seja "YEARLY" e o status "DONE"', () => {
                getDueDateByAccount({
                    status: ACCOUNT_STATUS.done,
                    type: ACCOUNT_TYPES.yearly,
                    dueDate: '2020-11-21 00:00:00.000',
                });

                expect(addFn).toHaveBeenCalledWith('years', 1);
                expect(formatFn).toHaveBeenCalled();
            });

            it('deve lançar um erro caso a conta não seja passada por parametro', () => {
                expect(() => {
                    getDueDateByAccount();
                }).toThrow(ERROR_CODES.accountIsInvalid);
            });

            it('deve lançar um erro caso a conta não tenha uma das propriedades "type", "status" ou "dueDate" preenchidas', () => {
                expect(() => {
                    getDueDateByAccount({
                        status: ACCOUNT_STATUS.done,
                    });
                }).toThrow(ERROR_CODES.accountIsInvalid);
            });
        });
    });
});
