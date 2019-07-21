import setAccountDate from './set-account-date';
import { accountEnum } from '../../utils/enumerators';

jest.mock('../../utils/functions/dates', () => ({
    getDaysInCurrentMonth: jest.fn(() => 30),
    addDaysAtTime: jest.fn(() => '2019-08-21 00:40:08.806Z'),
    addYearsAtTime: jest.fn(() => '2020-08-21 00:40:08.806Z'),
}));

describe('Domain/Common', () => {
    describe('Set Account Date', () => {
        let ACCOUNT_TYPE;
        const ACCOUNT_DATE = '2019-07-21 00:40:08.806Z';

        test('should return the date with 1 month more when the type is MONTHLY', () => {
            ACCOUNT_TYPE = accountEnum.type.monthly;

            const adjustedAccount = setAccountDate(ACCOUNT_TYPE, ACCOUNT_DATE);

            expect(adjustedAccount).toBe('2019-08-21 00:40:08.806Z');
        });

        test('should return the date with 1 yearl more when the type is YEARLY', () => {
            ACCOUNT_TYPE = accountEnum.type.yearly;

            const adjustedAccount = setAccountDate(ACCOUNT_TYPE, ACCOUNT_DATE);

            expect(adjustedAccount).toBe('2020-08-21 00:40:08.806Z');
        });
    });
});
