import Joi from '@hapi/joi';

import { PAYMENT_METHODS, STATUS, TYPES } from './enums';

const find = {
    DEFAULT_LIMIT: 50,
};

const accountSchema = {
    name: {
        name: 'name',
        validator: Joi.string()
            .min(3)
            .max(20)
            .required(),
    },
    description: {
        name: 'description',
        validator: Joi.string()
            .max(40)
            .optional(),
    },
    value: {
        name: 'value',
        validator: Joi.number()
            .positive()
            .required(),
    },
    dueDate: {
        name: 'dueDate',
        validator: Joi.date().required(),
    },
    amountPaid: {
        name: 'amountPaid',
        validator: Joi.number()
            .positive()
            .min(0)
            .default(0)
            .required(),
    },
    type: {
        name: 'type',
        validator: Joi.string()
            .valid(TYPES.monthly, TYPES.yearly)
            .required(),
    },
    paymentMethod: {
        name: 'paymentMethod',
        validator: Joi.string()
            .valid(PAYMENT_METHODS.credit, PAYMENT_METHODS.debitCard, PAYMENT_METHODS.ticket)
            .required(),
    },
    status: {
        name: 'status',
        validator: Joi.string()
            .valid(STATUS.pending, STATUS.expired, STATUS.done)
            .required(),
    },
    isRepeat: {
        name: 'isRepeat',
        validator: Joi.boolean().default(false),
    },
    tags: {
        name: 'tags',
        validator: Joi.array()
            .items(
                Joi.string()
                    .min(3)
                    .max(30)
            )
            .min(1)
            .optional(),
    },
};

const accountFields = Object.keys(accountSchema);

export default {
    find,
    accountSchema,
    accountFields,
};
