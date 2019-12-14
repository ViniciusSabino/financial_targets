import Validator from 'fastest-validator';

import getAccountFields from '../../../utils/helpers/get-account-fields';

const accountSchema = getAccountFields()
    .filter((field) => !field.isNotSchema)
    .reduce((acc, field) => {
        acc[field.name] = field.restrictions;

        return acc;
    }, {});

export default new Validator().compile(accountSchema);
