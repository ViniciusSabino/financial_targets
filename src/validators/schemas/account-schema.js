import Joi from '@hapi/joi';

import constants from '../../utils/constants';

const { accountFields, accountSchema } = constants;

const schema = Joi.object(
    accountFields.reduce((accSchema, field) => ({
        ...accSchema,
        [field]: accountSchema[field].validator,
    }))
);

export default schema;
