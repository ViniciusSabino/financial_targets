import moment from 'moment';

import changeAccountDueDate from './change-account-due-date';
import { AccountStatus, AccountType } from '../enum';

jest.mock('moment');

const momentAddMock = jest.fn(() => ({
    format: jest.fn(),
}));

moment.mockImplementation(() => ({
    add: momentAddMock,
}));

beforeEach(() => {
    momentAddMock.mockClear();
});

describe('Helpers/changeAccountDueDate', () => {
    it('should return the current dueDate if the account status is different from "DONE"', () => {
        const account = {
            status: AccountStatus.pending,
            type: AccountType.monthly,
            dueDate: '2020-11-21 00:00:00.000',
        };

        const updatedDueDate = changeAccountDueDate(account);

        expect(updatedDueDate).toBe(account.dueDate);
        expect(momentAddMock).not.toHaveBeenCalled();
    });

    it('should add 1 month to dueDate if the status is "DONE" and the type is "MONTHLY', () => {
        const account = {
            status: AccountStatus.done,
            type: AccountType.monthly,
            dueDate: '2020-11-21 00:00:00.000',
        };

        changeAccountDueDate(account);

        expect(momentAddMock).toHaveBeenCalledWith('months', 1);
    });

    it('should add 1 year to dueDate if the status is "DONE" and the team is "YEARLY"', () => {
        const account = {
            status: AccountStatus.done,
            type: AccountType.yearly,
            dueDate: '2020-11-21 00:00:00.000',
        };

        changeAccountDueDate(account);

        expect(momentAddMock).toHaveBeenCalledWith('years', 1);
    });
});
