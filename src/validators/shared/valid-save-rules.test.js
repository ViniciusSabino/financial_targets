import { ERROR_CODES, STATUS } from '../../utils/enums';
import validSaveRules from './valid-save-rules';

const dateNowDefault = Date.now;

const ACTION = 'test';

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

                const errors = validSaveRules(account, ACTION);

                expect(errors).toEqual({ errors: [ERROR_CODES.dueDateIsInvalid], action: ACTION });
            });

            it('should return an array with the error "amountPaidIsInvalid" if the amount paid is greater than the account amount', () => {
                const account = {
                    amountPaid: 200,
                    value: 100,
                };

                const errors = validSaveRules(account, ACTION);

                expect(errors).toEqual({
                    errors: [ERROR_CODES.amountPaidIsInvalid],
                    action: ACTION,
                });
            });

            it('should return an array with the error "accountIsNotPaidYet" if the amount paid is less than the value of the account "DONE"', () => {
                const account = {
                    amountPaid: 50,
                    value: 100,
                    status: STATUS.done,
                };

                const errors = validSaveRules(account, ACTION);

                expect(errors).toEqual({
                    errors: [ERROR_CODES.accountIsNotPaidYet],
                    action: ACTION,
                });
            });

            it('should return an array with the error "notExpiredAccount" if you try to register an expired account', () => {
                const account = {
                    status: STATUS.expired,
                };

                const errors = validSaveRules(account, ACTION);

                expect(errors).toEqual({
                    errors: [ERROR_CODES.notExpiredAccount],
                    action: ACTION,
                });
            });

            it('should return an empty array if there are no errors in validating the account', () => {
                const account = {
                    dueDate: '9999-12-31 00:00:00.000',
                };

                const errors = validSaveRules(account, ACTION);

                expect(errors).toEqual({ errors: [], action: ACTION });
            });
        });
    });
});
