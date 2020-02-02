/* eslint-disable no-undefined */
import getMapFieldsAndTypes from './get-map-fields-and-types';
import getFilterableFields from './get-filterable-fields';
import { FieldTypes } from '../enum';

jest.mock('./get-filterable-fields');

describe('Helpers/getMapFieldsAndTypes', () => {
    it('should return a Map where the key is an "account field" and the value is the "field type"', () => {
        getFilterableFields.mockImplementation(() => ({
            [FieldTypes.enum]: {
                fields: ['type', 'status', 'paymentForm'],
            },
            [FieldTypes.string]: {
                fields: ['name'],
            },
        }));

        const map = getMapFieldsAndTypes();

        expect(Array.from(map)).toStrictEqual([
            ['type', FieldTypes.enum],
            ['status', FieldTypes.enum],
            ['paymentForm', FieldTypes.enum],
            ['name', FieldTypes.string],
        ]);
    });

    it('should not add to the Map types that have no fields', () => {
        getFilterableFields.mockImplementation(() => ({
            [FieldTypes.number]: {
                fields: ['value'],
            },
            [FieldTypes.boolean]: {
                fields: undefined,
            },
        }));

        const map = getMapFieldsAndTypes();

        expect(Array.from(map)).toStrictEqual([['value', FieldTypes.number]]);
    });
});
