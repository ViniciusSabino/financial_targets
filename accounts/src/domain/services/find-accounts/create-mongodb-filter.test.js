/* eslint-disable max-nested-callbacks */
import createMongoFilter from './create-mongodb-filter';

describe('Domain', () => {
    describe('Services', () => {
        describe('Find Accounts', () => {
            describe('createMongoFilter', () => {
                it('should return the correct object for mongodb search', () => {
                    const entryFields = {
                        value: 200, // number
                        name: 'Meu Vivo', // string
                        type: 'MONTHLY', // enum
                        isrepeat: true, // boolean
                        duedatestart: '2019-01-20 18:54:37.000Z', // dateStart
                        duedateend: '2019-01-25 18:54:37.000Z', // dateEnd
                        tags: 'Mobile,Internet,Outros', // array
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
            });

            it('deveria ignorar na busca quando enviado campos não existentes na lista de fields', () => {
                const entryFields = {
                    value: 200,
                    price: 500, // invalid
                };

                const mongoFilter = createMongoFilter(entryFields);

                expect(mongoFilter).toHaveProperty('value');

                expect(mongoFilter).not.toHaveProperty('price');
            });
        });
    });
});
