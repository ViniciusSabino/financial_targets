/* eslint-disable max-nested-callbacks */

import calculateNewAmountPaid from './calculate-new-amount-paid';
import { ERROR_CODES } from '../../utils/enums';

jest.mock('moment');

describe('modules', () => {
    describe('shared', () => {
        describe('calculate-new-amountPaid', () => {
            it('deve retornar o proprio valor da conta caso a soma entre o amountPaid e o currentAmountPaid seja maior ou igual ao valor', () => {
                const unpaidAccount = {
                    amountPaid: 200,
                    value: 300,
                };

                const currentAmountPaid = 200;

                const amountPaid = calculateNewAmountPaid(currentAmountPaid, unpaidAccount);

                expect(amountPaid).toBe(unpaidAccount.value);
            });

            it('deve retornar o proprio currentAmountPaid caso o valor pago da conta seja 0', () => {
                const unpaidAccount = {
                    amountPaid: 0,
                    value: 300,
                };

                const currentAmountPaid = 200;

                const amountPaid = calculateNewAmountPaid(currentAmountPaid, unpaidAccount);

                expect(amountPaid).toBe(currentAmountPaid);
            });

            it('deve retornar a soma entre o amountPaid atual e o currentAmountPaid caso o resultado seja menor que o valor da conta', () => {
                const unpaidAccount = {
                    amountPaid: 200,
                    value: 600,
                };

                const currentAmountPaid = 100;

                const amountPaid = calculateNewAmountPaid(currentAmountPaid, unpaidAccount);

                expect(amountPaid).toBe(unpaidAccount.amountPaid + currentAmountPaid);
            });

            it('deve lançar um erro caso a conta ou currentAmountPaid não seja passado por parametro', () => {
                expect(() => {
                    const currentAmountPaid = 10;

                    calculateNewAmountPaid(currentAmountPaid);
                }).toThrow(ERROR_CODES.accountIsInvalid);
            });

            it('deve lançar um erro caso a conta não tenha a propriedade "value" preenchida', () => {
                const unpaidAccount = {};

                const currentAmountPaid = 100;

                expect(() => {
                    calculateNewAmountPaid(currentAmountPaid, unpaidAccount);
                }).toThrow(ERROR_CODES.accountIsInvalid);
            });
        });
    });
});
