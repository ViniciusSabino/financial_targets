import createMongodbSort from './create-mongodb-sort';

describe('Find Accounts', () => {
    describe('Create Mongodb Sort', () => {
        test('should create an object correctly of sort of crescent mongodb', () => {
            const field = 'name';

            const sort = createMongodbSort(field);

            expect(sort).toHaveProperty(field, 1);
        });

        test('should create an object correctly of sort of descending mongodb', () => {
            const field = 'name';

            const sort = createMongodbSort(field, 'desc');

            expect(sort).toHaveProperty(field, -1);
        });
    });
});
