/* eslint-disable max-nested-callbacks */
import getMapFieldsAndTypes from './get-map-fields-and-types';
import { FIELD_TYPES } from '../../../utils/enums';

jest.mock('./get-filterable-fields');

describe('Services', () => {
    describe('Find', () => {
        describe('Helpers', () => {
            describe('Get Map Fields and Types', () => {
                it('deve retornar um Map onde a chave é um atributo de uma conta e o valor é o tipo do campo', () => {
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

                it('não deve adicionar ao Map os tipos que não possuem campos', () => {
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
