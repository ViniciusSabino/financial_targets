import getAccountFields from '../../../utils/helpers/get-account-fields';

const getAccountSchema = () =>
    getAccountFields()
        .filter((field) => !field.isNotSchema)
        .reduce((acc, field) => {
            acc[field.name] = field.restrictions;

            return acc;
        }, {});

export default getAccountSchema;
