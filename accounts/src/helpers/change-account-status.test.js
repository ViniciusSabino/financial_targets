import changeAccountStatus from './change-account-status';
import { AccountStatus } from './enum';

describe('Helpers/ChangeAccountStatus', () => {
    it('should return the status "DONE" when the amountPaid is equal to the value of account', () => {
        const account = {
            amountPaid: 100,
            value: 100,
            status: AccountStatus.pending,
        };

        const updatedStatus = changeAccountStatus(account);

        expect(updatedStatus).toBe(AccountStatus.done);
    });

    it('should return the current account status if the amountPaid does not equal the amount', () => {
        const account = {
            amountPaid: 100,
            value: 200,
            status: AccountStatus.expired,
        };

        const updatedStatus = changeAccountStatus(account);

        expect(updatedStatus).toBe(account.status);
    });
});
