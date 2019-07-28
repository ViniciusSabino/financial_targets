import { setTheStatus } from '.';
import { accountEnum } from '../../utils/enumerators';

describe('Domain/Adapters', () => {
    describe('Create Account Adapter', () => {
        let AMOUNT_PAID;
        let VALUE;

        it('should return "DONE" status when amountPaid equals account value', () => {
            AMOUNT_PAID = 300.0;
            VALUE = 300.0;

            const status = setTheStatus(AMOUNT_PAID, VALUE);

            expect(status).toBe(accountEnum.status.done);
        });

        it('should return "PENDING" status when amountPaid is less than account value', () => {
            AMOUNT_PAID = 300.0;
            VALUE = 100.0;

            const status = setTheStatus(AMOUNT_PAID, VALUE);

            expect(status).toBe(accountEnum.status.pending);
        });
    });
});
