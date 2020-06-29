import constants from '../../utils/constants';

const { accountFields, accountSchema } = constants;

const getDynamicSchema = (fields) => {
    const invalidFields = [];

    const schemaFields = fields.map((field) => {
        const soughtField = accountFields.find((accountField) => accountField === field);

        if (!soughtField) invalidFields.push(field);

        return field;
    });

    if (invalidFields.length) {
        throw Error(
            `The following fields do not belong to an account: ${invalidFields.join(', ')}`
        );
    }

    const schema = schemaFields.reduce(
        (accSchema, field) => ({
            ...accSchema,
            [field]: accountSchema[field].validator,
        }),
        {}
    );

    return schema;
};

export default getDynamicSchema;
