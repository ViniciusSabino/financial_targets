import Validator from 'fastest-validator';

import fields from '../../../helpers/constants/account-fields';

const accountSchema = fields.reduce((acc, field) => {
    acc[field.name] = field.restrictions;

    return acc;
}, {});

export default new Validator().compile(accountSchema);
