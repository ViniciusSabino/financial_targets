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

describe('Services', () => {
    describe('Find', () => {
        describe('Helpers', () => {
            describe('create Filter', () => {
                it('should return an object representing the filter in mongodb based on the received fields', () => {
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

                it('should return an empty object if there are no fields for filtering', () => {
                    const filter = createFilter({});

                    expect(filter).toEqual({});
                });

                it('should ignore filtering properties that are not part of an account', () => {
                    const fields = {
                        value: 400,
                        title: 'Not exists',
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

                it('should return an empty object if "undefined" is passed to create the filter', () => {
                    const filter = createFilter();

                    expect(filter).toEqual({});
                });
            });
        });
    });
});
