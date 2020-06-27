/* eslint-disable max-nested-callbacks */
import getMapFieldsAndTypes from './get-map-fields-and-types';
import { FIELD_TYPES } from '../../../utils/enums';

jest.mock('./get-filterable-fields');

describe('Services', () => {
    describe('Find', () => {
        describe('Helpers', () => {
            describe('Get Map Fields and Types', () => {
                it('should return a Map where the key is the attribute of an account and the value is the type of the field', () => {
                    const filterableFields = {
                        [FIELD_TYPES.enum]: {
                            fields: ['type', 'status', 'paymentMethod'],
                        },
                        [FIELD_TYPES.string]: {
                            fields: ['name'],
                        },
                    };

                    const map = getMapFieldsAndTypes(filterableFields);

                    expect(Array.from(map)).toStrictEqual([
                        ['type', FIELD_TYPES.enum],
                        ['status', FIELD_TYPES.enum],
                        ['paymentMethod', FIELD_TYPES.enum],
                        ['name', FIELD_TYPES.string],
                    ]);
                });

                it('should not add to the Map types that do not have linked fields', () => {
                    const filterableFields = {
                        [FIELD_TYPES.number]: {
                            fields: ['value'],
                        },
                        [FIELD_TYPES.boolean]: {
                            fields: [],
                        },
                    };

                    const map = getMapFieldsAndTypes(filterableFields);

                    expect(Array.from(map)).toStrictEqual([['value', FIELD_TYPES.number]]);
                });
            });
        });
    });
});
