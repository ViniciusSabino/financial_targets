/* eslint-disable no-undefined */
import getMapFieldsAndTypes from './get-map-fields-and-types';
import getFilterableFields from './get-filterable-fields';
import { FIELD_TYPES } from '../../../utils/enums';

jest.mock('./get-filterable-fields');

describe('find-accounts', () => {
    describe('helpers', () => {
        describe('get-map-fields-and-types', () => {
            it('deve retornar um Map onde a chave é um campo de uma conta e o valor é o tipo do campo', () => {
                getFilterableFields.mockImplementation(() => ({
                    [FIELD_TYPES.enum]: {
                        fields: ['type', 'status', 'paymentMethod'],
                    },
                    [FIELD_TYPES.string]: {
                        fields: ['name'],
                    },
                }));

                const map = getMapFieldsAndTypes();

                expect(Array.from(map)).toStrictEqual([
                    ['type', FIELD_TYPES.enum],
                    ['status', FIELD_TYPES.enum],
                    ['paymentMethod', FIELD_TYPES.enum],
                    ['name', FIELD_TYPES.string],
                ]);
            });

            it('não deve adicionar ao Map os tipos que não possuem campos', () => {
                getFilterableFields.mockImplementation(() => ({
                    [FIELD_TYPES.number]: {
                        fields: ['value'],
                    },
                    [FIELD_TYPES.boolean]: {
                        fields: undefined,
                    },
                }));

                const map = getMapFieldsAndTypes();

                expect(Array.from(map)).toStrictEqual([['value', FIELD_TYPES.number]]);
            });
        });
    });
});
