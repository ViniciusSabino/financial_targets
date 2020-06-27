import createSort from './create-sort';

describe('Services', () => {
    describe('Find', () => {
        describe('Helpers', () => {
            describe('Create Sort', () => {
                it('should return an object representing an order in ascending order', () => {
                    const ordination = createSort({ sort: 'name' });

                    expect(ordination).toEqual({
                        name: 1,
                    });
                });

                it('should return an object representing a sorting in descending order', () => {
                    const ordination = createSort({ sort: 'value', order: 'desc' });

                    expect(ordination).toEqual({
                        value: -1,
                    });
                });

                it('should return a standard sort if not determined and ascending order', () => {
                    const ordination = createSort({});

                    expect(ordination).toEqual({
                        name: 1,
                    });
                });

                it('should return a standard sort if not determined and descending order', () => {
                    const order = 'desc';

                    const ordination = createSort({ order });

                    expect(ordination).toEqual({
                        name: -1,
                    });
                });
            });
        });
    });
});
