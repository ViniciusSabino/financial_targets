import mockingoose from 'mockingoose';

import Account from '../../database/mongodb/models/account';
import { makePartialPaymentAdapter } from '.';
import mock from '../../__mocks__/adapters';

const resultProperties = [
    'id',
    'status',
    'value',
    'type',
    'dueDate',
    'amountPaid',
    'amountPaidNow',
];

describe('Domain/Adapters', () => {
    describe('Make Partial Payment Adapter', () => {
        const mockParams = {
            accountId: '507f191e810c19729de860ea',
            amountPaid: 300.0,
        };

        beforeEach(() => {
            mockingoose.resetAll();
        });

        it('should return account with "amountPaidNow" equal to "amountPaid" sent', async () => {
            mockingoose(Account).toReturn(mock.makePartialPayment, 'findOne');

            const result = await makePartialPaymentAdapter(mockParams);

            expect(result).toHaveProperty('amountPaidNow', mockParams.amountPaid);

            resultProperties.forEach((property) => {
                expect(result).toHaveProperty(property);
            });
        });

        it('should not return any account when not found based on id', async () => {
            mockingoose(Account).toReturn(undefined, 'findById');

            const result = await makePartialPaymentAdapter(mockParams);

            expect(result).toStrictEqual({});
        });
    });
});
