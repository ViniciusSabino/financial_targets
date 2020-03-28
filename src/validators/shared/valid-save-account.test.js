import { ERROR_CODES, ACCOUNT_STATUS } from '../../utils/enums';
import validSaveAccount from './valid-save-account';

const dateNowDefault = Date.now;

describe('validators', () => {
    describe('shared', () => {
        beforeAll(() => {
            Date.now = jest.fn(() => Date.parse('2020-01-01'));
        });

        afterAll(() => {
            Date.now = dateNowDefault;
        });

        describe('valid-save-account', () => {
            it('devera retornar um array com o erro "dueDateIsInvalid" caso a data de pagamento seja menor que a data atual', () => {
                const account = {
                    dueDate: '2019-12-31 00:00:00.000',
                };

                const errors = validSaveAccount(account);

                expect(errors).toEqual([ERROR_CODES.dueDateIsInvalid]);
            });

            it('devera retornar um array com o erro "amountPaidIsInvalid" caso o valor pago seja maior que o valor da conta', () => {
                const account = {
                    amountPaid: 200,
                    value: 100,
                };

                const errors = validSaveAccount(account);

                expect(errors).toEqual([ERROR_CODES.amountPaidIsInvalid]);
            });

            it('devera retornar um array com o erro "accountIsNotPaidYet" caso o valor pago seja menor que o valor da conta e o status seja "DONE"', () => {
                const account = {
                    amountPaid: 50,
                    value: 100,
                    status: ACCOUNT_STATUS.done,
                };

                const errors = validSaveAccount(account);

                expect(errors).toEqual([ERROR_CODES.accountIsNotPaidYet]);
            });
        });
    });
});
