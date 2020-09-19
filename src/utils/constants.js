import Joi from '@hapi/joi';

import { PAYMENT_METHODS, STATUS, TYPES } from './enums';

const find = {
    DEFAULT_LIMIT: 50,
};

const accountSchema = {
    name: {
        // Nome da conta a pagar
        name: 'name',
        validator: Joi.string()
            .min(3)
            .max(20)
            .required(),
    },
    description: {
        // Descrição da conta
        name: 'description',
        validator: Joi.string()
            .max(40)
            .optional(),
    },
    value: {
        // Valor real que precisa ser pago
        name: 'value',
        validator: Joi.number()
            .positive()
            .required(),
    },
    dueDate: {
        // Data para pagamento
        name: 'dueDate',
        validator: Joi.date().required(),
    },
    amountPaid: {
        // Valor que já foi pago
        name: 'amountPaid',
        validator: Joi.number()
            .positive()
            .min(0)
            .default(0)
            .required(),
    },
    type: {
        // Tipo de conta
        name: 'type',
        validator: Joi.string()
            .valid(TYPES.monthly, TYPES.yearly)
            .required(),
    },
    paymentMethod: {
        // Forma de pagamento para a conta
        name: 'paymentMethod',
        validator: Joi.string()
            .valid(PAYMENT_METHODS.credit, PAYMENT_METHODS.debitCard, PAYMENT_METHODS.ticket)
            .required(),
    },
    status: {
        // Status da Conta
        name: 'status',
        validator: Joi.string()
            .valid(STATUS.pending, STATUS.expired, STATUS.done)
            .required(),
    },
    isRepeat: {
        // Se essa conta irá se repetir
        name: 'isRepeat',
        validator: Joi.boolean().default(false),
    },
    tags: {
        // Tags para facilitar a classificação da conta
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
