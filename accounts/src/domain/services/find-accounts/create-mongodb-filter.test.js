/* eslint-disable max-nested-callbacks */
import createMongoFilter from './create-mongodb-filter';
import getAccountFields from '../../../utils/helpers/get-account-fields';
import { accountFieldsMock } from './__mocks__';

jest.mock('../../../utils/helpers/get-account-fields');

getAccountFields.mockImplementation(() => accountFieldsMock);

describe('Domain', () => {
    describe('Services', () => {
        describe('Find Accounts', () => {
            describe('createMongoFilter', () => {
                it('should return the correct object for mongodb search', () => {
                    const entryFields = {
                        value: 200,
                        name: 'Meu Vivo',
                        type: 'MONTHLY',
                        isrepeat: true,
                        duedatestart: '2019-01-20 18:54:37.000Z',
                        duedateend: '2019-01-25 18:54:37.000Z',
                        tags: 'Mobile,Internet,Outros',
                    };

                    const mongoFilter = createMongoFilter(entryFields);

                    expect(mongoFilter).toHaveProperty('value', { $eq: 200 });
                    expect(mongoFilter).toHaveProperty('name', {
                        $regex: 'Meu Vivo',
                        $options: 'i',
                    });
                    expect(mongoFilter).toHaveProperty('type', { $eq: 'MONTHLY' });
                    expect(mongoFilter).toHaveProperty('isRepeat', true);
                    expect(mongoFilter).toHaveProperty('dueDate', {
                        $gte: '2019-01-20 18:54:37.000Z',
                        $lte: '2019-01-25 18:54:37.000Z',
                    });
                    expect(mongoFilter).toHaveProperty('tags', {
                        $in: ['Mobile', 'Internet', 'Outros'],
                    });
                });

                it('should ignore in search when submitted fields do not exist in field list', () => {
                    const entryFields = {
                        value: 200,
                        price: 500, // invalid
                    };

                    const mongoFilter = createMongoFilter(entryFields);

                    expect(mongoFilter).toHaveProperty('value');
                    expect(mongoFilter).not.toHaveProperty('price');
                });

                it('should ignore in search when fields sent but type is not in condition', () => {
                    const entryFields = {
                        value: 200,
                        price: 500,
                    };

                    getAccountFields.mockImplementation(() => [
                        ...accountFieldsMock,
                        {
                            parameter: 'price',
                            name: 'price',
                            description: 'Price the account',
                            restrictions: {
                                type: 'price', // not in condition
                                positive: true,
                            },
                        },
                    ]);

                    const mongoFilter = createMongoFilter(entryFields);

                    expect(mongoFilter).toHaveProperty('value');
                    expect(mongoFilter).not.toHaveProperty('price');
                });
            });
        });
    });
});
