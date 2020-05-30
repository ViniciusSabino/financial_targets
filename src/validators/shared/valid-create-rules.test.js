import { ERROR_CODES, STATUS } from '../../utils/enums';
import validCreateRules from './valid-create-rules';

const dateNowDefault = Date.now;

describe('Validators', () => {
    describe('Shared', () => {
        beforeAll(() => {
            Date.now = jest.fn(() => Date.parse('2020-01-01'));
        });

        afterAll(() => {
            Date.now = dateNowDefault;
        });

        describe('Valid Create Rules', () => {
            it('should return an array with the error "dueDateIsInvalid" if the payment date is less than the current date', () => {
                const account = {
                    dueDate: '2019-12-31 00:00:00.000',
                };

                const errors = validCreateRules(account);

                expect(errors).toEqual([ERROR_CODES.dueDateIsInvalid]);
            });

            it('should return an array with the error "amountPaidIsInvalid" if the amount paid is greater than the account amount', () => {
                const account = {
                    amountPaid: 200,
                    value: 100,
                };

                const errors = validCreateRules(account);

                expect(errors).toEqual([ERROR_CODES.amountPaidIsInvalid]);
            });

            it('should return an array with the error "accountIsNotPaidYet" if the amount paid is less than the value of the account "DONE"', () => {
                const account = {
                    amountPaid: 50,
                    value: 100,
                    status: STATUS.done,
                };

                const errors = validCreateRules(account);

                expect(errors).toEqual([ERROR_CODES.accountIsNotPaidYet]);
            });

            it('should return an empty array if there are no errors in validating the account', () => {
                const account = {
                    dueDate: '9999-12-31 00:00:00.000',
                };

                const errors = validCreateRules(account);

                expect(errors.length).toEqual(0);
            });
        });
    });
});
