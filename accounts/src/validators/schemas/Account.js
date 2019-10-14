import Validator from 'fastest-validator';
import fields from '../../helpers/constants/accountFields';

const schema = fields.reduce((acc, field) => {
    acc[field.name] = field.restrictions;

    return acc;
}, {});

export default new Validator().compile(schema);
