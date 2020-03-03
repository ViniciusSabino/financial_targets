import { getFilterableFields } from './index';
import { FieldTypes } from '../enum';

describe('Helpers/getFilterableFields', () => {
    const filterableFields = getFilterableFields();

    it('there should be mapping for all supported field types', () => {
        expect(filterableFields).toHaveProperty(FieldTypes.number);
        expect(filterableFields).toHaveProperty(FieldTypes.array);
        expect(filterableFields).toHaveProperty(FieldTypes.enum);
        expect(filterableFields).toHaveProperty(FieldTypes.boolean);
        expect(filterableFields).toHaveProperty(FieldTypes.string);
    });

    it('should for type "number" have the properties "fields" and the function "getFilter"', () => {
        const typeNumber = filterableFields[FieldTypes.number];

        expect(typeNumber).toHaveProperty('fields');
        expect(typeNumber).toHaveProperty('getFilter');
        expect(typeNumber.fields).toEqual(expect.any(Array));

        const filter = typeNumber.getFilter('value', 300);

        expect(filter).toStrictEqual({
            value: {
                $eq: 300,
            },
        });
    });

    it('should for type "enum" have the properties "fields" and the function "getFilter"', () => {
        const typeEnum = filterableFields[FieldTypes.enum];

        expect(typeEnum).toHaveProperty('fields');
        expect(typeEnum).toHaveProperty('getFilter');
        expect(typeEnum.fields).toEqual(expect.any(Array));

        const filter = typeEnum.getFilter('status', 'PENDING');

        expect(filter).toStrictEqual({
            status: {
                $eq: 'PENDING',
            },
        });
    });

    it('should for type "string" have the properties "fields" and the function "getFilter"', () => {
        const typeString = filterableFields[FieldTypes.string];

        expect(typeString).toHaveProperty('fields');
        expect(typeString).toHaveProperty('getFilter');
        expect(typeString.fields).toEqual(expect.any(Array));

        const filter = typeString.getFilter('name', 'NuBank');

        expect(filter).toStrictEqual({
            name: {
                $regex: 'NuBank',
                $options: 'i',
            },
        });
    });

    it('should for type "boolean" have the properties "fields" and the function "getFilter"', () => {
        const typeBoolean = filterableFields[FieldTypes.boolean];

        expect(typeBoolean).toHaveProperty('fields');
        expect(typeBoolean).toHaveProperty('getFilter');
        expect(typeBoolean.fields).toEqual(expect.any(Array));

        const filter = typeBoolean.getFilter('isRepeat', true);

        expect(filter).toStrictEqual({
            isRepeat: true,
        });
    });

    it('should for type "array" have the properties "fields" and the function "getFilter"', () => {
        const typeArray = filterableFields[FieldTypes.array];

        expect(typeArray).toHaveProperty('fields');
        expect(typeArray).toHaveProperty('getFilter');
        expect(typeArray.fields).toEqual(expect.any(Array));

        const filter = typeArray.getFilter('tags', 'Banco,Celular,Internet,Viagens');

        expect(filter).toStrictEqual({
            tags: {
                $in: ['Banco', 'Celular', 'Internet', 'Viagens'],
            },
        });
    });
});
