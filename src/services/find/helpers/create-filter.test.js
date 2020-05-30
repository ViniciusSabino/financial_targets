import getMapFieldsAndTypes from './get-map-fields-and-types';
import getFilterableFields from './get-filterable-fields';
import createFilter from './create-filter';
import { FIELD_TYPES } from '../../../utils/enums';

jest.mock('./get-map-fields-and-types');
jest.mock('./get-filterable-fields');

getFilterableFields.mockImplementation(() => ({
    [FIELD_TYPES.number]: {
        fields: ['value'],
        getFilter: (key, value) => ({
            [key]: {
                $eq: value,
            },
        }),
    },

    [FIELD_TYPES.array]: {
        fields: ['tags'],
        getFilter: (key, value) => ({
            [key]: {
                $in: value.split(','),
            },
        }),
    },
}));

getMapFieldsAndTypes.mockImplementation(
    () =>
        new Map([
            ['value', FIELD_TYPES.number],
            ['tags', FIELD_TYPES.array],
        ])
);

describe('find-accounts', () => {
    describe('helpers', () => {
        describe('create-filter', () => {
            it('deve retornar um objeto para filtro no mongodb com base nos campos recebibos', () => {
                const fields = {
                    value: 200,
                    tags: 'Vivo,NuBank,Compras',
                };

                const filter = createFilter(fields);

                expect(filter).toEqual({
                    value: {
                        $eq: fields.value,
                    },
                    tags: {
                        $in: fields.tags.split(','),
                    },
                });
            });

            it('deve retornar um objeto vazio caso não tenha campos para filtrar', () => {
                const fields = {};

                const filter = createFilter(fields);

                expect(filter).toEqual({});
            });

            it('deve ignorar na filtragem propriedades que não fazem parte de uma conta', () => {
                const fields = {
                    value: 400,
                    'Access-Control-Allow-Origin': '*',
                    'cache-control': 'no-cache',
                };

                const filter = createFilter(fields);

                expect(filter).toEqual({
                    value: {
                        $eq: fields.value,
                    },
                });
            });
        });
    });
});
