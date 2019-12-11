import Validator from 'fastest-validator';

import fields from '../../../utils/constants/account-fields';

const accountSchema = fields
    .filter((field) => !field.isNotSchema)
    .reduce((acc, field) => {
        acc[field.name] = field.restrictions;

        return acc;
    }, {});

export default new Validator().compile(accountSchema);
