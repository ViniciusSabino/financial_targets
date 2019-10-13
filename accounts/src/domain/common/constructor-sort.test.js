import { constructorSort } from '.';

describe('Domain/Common', () => {
    describe('Constructor Sort', () => {
        let SORT;
        let ORDER;

        it('should create object "sort" to return descending', () => {
            SORT = 'name';
            ORDER = 'desc';

            const sort = constructorSort(SORT, ORDER);

            expect(sort).toHaveProperty(SORT, -1);
        });

        it('should create object "sort" to return ascending', () => {
            SORT = 'name';
            ORDER = 'asc';

            const sort = constructorSort(SORT, ORDER);

            expect(sort).toHaveProperty(SORT, 1);
        });

        it('should create object "sort" to return ascending when "order" is not specific', () => {
            SORT = 'name';

            const sort = constructorSort(SORT);

            expect(sort).toHaveProperty(SORT, 1);
        });
    });
});
