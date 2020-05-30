import Joi from '@hapi/joi';

import { PAYMENT_METHODS, STATUS, TYPES } from '../../utils/enums';

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .required(),

    description: Joi.string()
        .max(40)
        .optional(),

    value: Joi.number()
        .positive()
        .required(),

    dueDate: Joi.date().required(),

    amountPaid: Joi.number()
        .positive()
        .min(0)
        .default(0)
        .optional(),

    type: Joi.string()
        .valid(TYPES.monthly, TYPES.yearly)
        .required(),

    paymentMethod: Joi.string()
        .valid(PAYMENT_METHODS.credit, PAYMENT_METHODS.debitCard, PAYMENT_METHODS.ticket)
        .required(),

    status: Joi.string()
        .valid(STATUS.pending, STATUS.expired, STATUS.done)
        .required(),

    isRepeat: Joi.boolean().default(false),

    tags: Joi.array()
        .items(
            Joi.string()
                .min(3)
                .max(30)
        )
        .min(1)
        .optional(),
});

export default schema;
