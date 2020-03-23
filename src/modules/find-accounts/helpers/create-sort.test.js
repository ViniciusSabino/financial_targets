import createSort from './create-sort';

describe('find-accounts', () => {
    describe('helpers => createSort', () => {
        it('deve retornar um objeto representando um ordenação em order crescente', () => {
            const ordination = createSort('name');

            expect(ordination).toEqual({
                name: 1,
            });
        });

        it('deve retornar um objeto representando um ordenação em order decrescente', () => {
            const ordination = createSort('value', 'desc');

            expect(ordination).toEqual({
                value: -1,
            });
        });
    });
});
