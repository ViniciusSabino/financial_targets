import Joi from '@hapi/joi';
import { ACCOUNT_PAYMENT_METHODS, ACCOUNT_STATUS, ACCOUNT_TYPES } from '../../utils/enums';

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
        .valid(ACCOUNT_TYPES.monthly, ACCOUNT_TYPES.yearly)
        .required(),

    paymentMethod: Joi.string()
        .valid(
            ACCOUNT_PAYMENT_METHODS.credit,
            ACCOUNT_PAYMENT_METHODS.debitCard,
            ACCOUNT_PAYMENT_METHODS.ticket
        )
        .required(),

    status: Joi.string()
        .valid(ACCOUNT_STATUS.pending, ACCOUNT_STATUS.expired, ACCOUNT_STATUS.done)
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
