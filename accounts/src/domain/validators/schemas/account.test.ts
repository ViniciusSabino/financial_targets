/* eslint-disable max-nested-callbacks */

import getAccountFields from '../../../utils/helpers/get-account-fields';
import fieldTypes from '../../../utils/constants/account-field-types';
import getAccountSchema from './account';

jest.mock('../../../utils/helpers/get-account-fields');

describe('Validators', () => {
    describe('Schemas/Account', () => {
        it('should return schema with all fields when none has property "isNotSchema"', () => {
            getAccountFields.mockImplementation(() => [
                {
                    parameter: 'userid',
                    name: 'userId',
                    description: 'User who created the account',
                    restrictions: {
                        type: fieldTypes.number,
                        positive: true,
                    },
                },
                {
                    parameter: 'name',
                    name: 'name',
                    description: 'Account name',
                    restrictions: {
                        type: fieldTypes.string,
                        min: 3,
                        max: 20,
                    },
                },
            ]);

            const schema = getAccountSchema();

            expect(schema).toHaveProperty('userId', {
                type: fieldTypes.number,
                positive: true,
            });

            expect(schema).toHaveProperty('name', {
                type: fieldTypes.string,
                min: 3,
                max: 20,
            });
        });
    });
});
