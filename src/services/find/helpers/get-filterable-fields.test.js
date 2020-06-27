import { getFilterableFields } from './index';
import { FIELD_TYPES } from '../../../utils/enums';

describe('Services', () => {
    describe('Find', () => {
        describe('Helpers', () => {
            describe('Get Filterable Fields', () => {
                const filterableFields = getFilterableFields();

                it('should have mapping for all types of fields supported by the api', () => {
                    expect(filterableFields).toHaveProperty(FIELD_TYPES.number);
                    expect(filterableFields).toHaveProperty(FIELD_TYPES.array);
                    expect(filterableFields).toHaveProperty(FIELD_TYPES.enum);
                    expect(filterableFields).toHaveProperty(FIELD_TYPES.boolean);
                    expect(filterableFields).toHaveProperty(FIELD_TYPES.string);
                });

                it('should for type "number" have fields properties and getFilter function', () => {
                    const typeNumber = filterableFields[FIELD_TYPES.number];

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

                it('should for type "enum" have fields properties and getFilter function', () => {
                    const typeEnum = filterableFields[FIELD_TYPES.enum];

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

                it('should for type "string" have fields properties and getFilter function', () => {
                    const typeString = filterableFields[FIELD_TYPES.string];

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

                it('should for type "boolean" have fields properties and getFilter function', () => {
                    const typeBoolean = filterableFields[FIELD_TYPES.boolean];

                    expect(typeBoolean).toHaveProperty('fields');
                    expect(typeBoolean).toHaveProperty('getFilter');
                    expect(typeBoolean.fields).toEqual(expect.any(Array));

                    const filter = typeBoolean.getFilter('isRepeat', true);

                    expect(filter).toStrictEqual({
                        isRepeat: true,
                    });
                });

                it('should for type "array" have fields properties and getFilter function', () => {
                    const typeArray = filterableFields[FIELD_TYPES.array];

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
        });
    });
});
