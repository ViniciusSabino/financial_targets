import getDynamicSchema from './get-dynamic-schema';
import constants from '../../utils/constants';

const { accountSchema } = constants;

describe('Validators', () => {
    describe('Helpers', () => {
        describe('Get Dynamic Schema', () => {
            it('should return a schema based on the fields passed in the array', () => {
                const fields = [accountSchema.name.name, accountSchema.amountPaid.name];

                const schema = getDynamicSchema(fields);

                expect(schema).toEqual({
                    [accountSchema.name.name]: accountSchema.name.validator,
                    [accountSchema.amountPaid.name]: accountSchema.amountPaid.validator,
                });
            });

            it('should give an exception when a field is passed that is not necessarily from an account', () => {
                const fields = [accountSchema.name.name, 'title', 'fieldTest'];

                expect(() => getDynamicSchema(fields)).toThrow(
                    'The following fields do not belong to an account: title, fieldTest'
                );
            });
        });
    });
});
