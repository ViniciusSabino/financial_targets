import setAccountDate from './set-account-date';
import { accountEnum } from '../../utils/enumerators';

jest.mock('moment', () => () => ({
    daysInMonth: () => 30,
    add: (amount, unit) => ({ amount, unit }),
}));

describe('Domain/Common', () => {
    describe('Set Account Date', () => {
        let ACCOUNT_TYPE;
        const ACCOUNT_DATE = '2019-07-21 00:40:08.806Z';

        it('should return the date with 1 month more when the type is MONTHLY', () => {
            ACCOUNT_TYPE = accountEnum.type.monthly;

            const adjustedAccount = setAccountDate(ACCOUNT_TYPE, ACCOUNT_DATE);

            expect(adjustedAccount).toHaveProperty('amount', 30);
            expect(adjustedAccount).toHaveProperty('unit', 'days');
        });

        it('should return the date with 1 yearl more when the type is YEARLY', () => {
            ACCOUNT_TYPE = accountEnum.type.yearly;

            const adjustedAccount = setAccountDate(ACCOUNT_TYPE, ACCOUNT_DATE);

            expect(adjustedAccount).toHaveProperty('amount', 1);
            expect(adjustedAccount).toHaveProperty('unit', 'years');
        });
    });
});
