import Joi from '@hapi/joi';
import { AccountPaymentForm, AccountStatus, AccountType } from '../../types';

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
        .optional(),

    type: Joi.string()
        .valid([AccountType.monthly, AccountType.yearly])
        .required(),

    paymentForm: Joi.string()
        .valid([AccountPaymentForm.credit, AccountPaymentForm.debitCard, AccountPaymentForm.ticket])
        .required(),

    status: Joi.string()
        .valid([AccountStatus.pending, AccountStatus.expired, AccountStatus.done])
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
