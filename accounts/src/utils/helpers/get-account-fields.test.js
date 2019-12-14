import getAccountFields from './get-account-fields';

describe('Constants', () => {
    describe('Account field types', () => {
        it('should return the correct structure of a field for account schema', () => {
            getAccountFields()
                .filter((field) => !field.isNotSchema)
                .forEach((field) => {
                    expect(field).toHaveProperty('parameter');
                    expect(field).toHaveProperty('name');
                    expect(field).toHaveProperty('description');
                    expect(field).toHaveProperty('restrictions');
                    expect(field).not.toHaveProperty('isNotSchema');
                });
        });

        it('should return the correct structure of a field that is not part of the schema', () => {
            getAccountFields()
                .filter((field) => field.isNotSchema)
                .forEach((field) => {
                    expect(field).toHaveProperty('parameter');
                    expect(field).toHaveProperty('name');
                    expect(field).toHaveProperty('description');
                    expect(field).toHaveProperty('restrictions');
                    expect(field).toHaveProperty('isNotSchema', true);
                });
        });
    });
});
