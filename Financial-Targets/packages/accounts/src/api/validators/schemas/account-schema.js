import Validator from 'fastest-validator';

import accountEnum from '../../utils/enumerators/account-enum';

const accountSchema = {
    userId: { type: 'number', positive: true },
    name: { type: 'string', min: 3, max: 20 },
    description: { type: 'string', max: 40, optional: true },
    value: { type: 'number', positive: true },
    dueDate: { type: 'string' },
    amountPaid: { type: 'number', optional: true, min: 0 },
    type: { type: 'enum', values: Object.values(accountEnum.type) },
    paymentForm: { type: 'enum', values: Object.values(accountEnum.paymentForm) },
    isRepeat: { type: 'boolean' },
    tags: { type: 'array', items: 'string', optional: true },
};

export default new Validator().compile(accountSchema);
