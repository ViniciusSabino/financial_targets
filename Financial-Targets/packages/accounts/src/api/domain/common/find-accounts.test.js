import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import Account from '../../database/mongodb/models/account';
import mock from '../../__mocks__/common';

import { findAccounts } from '.';

let mongoServer;

describe('Domain/Common', () => {
    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();

        const mongoUri = await mongoServer.getConnectionString();

        await mongoose.connect(mongoUri);

        await Account.insertMany(mock.find);
    });

    afterAll(async () => {
        await mongoose.disconnect();

        await mongoServer.stop();
    });

    describe('Find Accounts', () => {
        it('should filter correctly on mongoose based on the filters', async () => {
            const mongoFilter = { paymentForm: 'CREDIT' };
            const sort = 'value';
            const order = 'desc';
            const limit = '1';

            const accounts = await findAccounts({
                mongoFilter,
                sort,
                order,
                limit,
            });

            // test - limit
            expect(accounts.length).toBe(1);

            // test - sort and order
            expect(accounts[0]).toHaveProperty('value', 700);
            expect(accounts[0]).toHaveProperty('name', 'Three');

            // test - mongoFilter
            expect(accounts[0]).toHaveProperty('paymentForm', 'CREDIT');
        });
    });
});
