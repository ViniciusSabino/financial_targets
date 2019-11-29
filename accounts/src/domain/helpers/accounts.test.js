import { setAccountStatus } from './accounts';
import accountConstants from '../../utils/constants/account';

/* eslint-disable max-nested-callbacks */
describe('Domain', () => {
    describe('Helpers', () => {
        describe('Accounts', () => {
            describe('setAccountStatus', () => {
                it('return status "DONE" when amountPaid equals value', () => {
                    const unpaidAccountMock = {
                        value: 200,
                        status: accountConstants.status.pending,
                    };
                    const status = setAccountStatus(200, unpaidAccountMock);

                    expect(status).toEqual(accountConstants.status.done);
                });
            });
        });
    });
});
