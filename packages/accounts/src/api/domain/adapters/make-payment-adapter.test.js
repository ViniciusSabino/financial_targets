import { findAccounts } from '../common';
import { makePaymentAdapter } from '.';
import mock from '../../__mocks__/adapters';

jest.mock('../common', () => ({
    findAccounts: jest.fn(),
}));

const resultProperties = ['id', 'status', 'value', 'type', 'dueDate'];

describe('Domain/Adapters', () => {
    describe('Make Payment Adapter', () => {
        const param = ['1, 2, 3']; // account ids

        it('should return account with "amountPaidNow" equal to "amountPaid" sent', async () => {
            findAccounts.mockImplementation(() => Promise.resolve(mock.makePayment));

            const result = await makePaymentAdapter(param);

            expect(Array.isArray(result)).toBe(true);

            resultProperties.forEach((property) => {
                expect(result[0]).toHaveProperty(property);
                expect(result[1]).toHaveProperty(property);
            });
        });

        it('should not return any accounts when not found based on ids', async () => {
            findAccounts.mockImplementation(() => Promise.resolve([]));

            const result = await makePaymentAdapter(param);

            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });
});
