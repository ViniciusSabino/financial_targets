import { fieldTypes, accountStatus, accountTypes, accountPaymentForms } from '.';

// fastest validator - restrictions
export default [
    {
        parameter: 'userid',
        name: 'userId',
        restrictions: {
            type: fieldTypes.number,
            positive: true,
        },
    },
    {
        parameter: 'name',
        name: 'name',
        restrictions: {
            type: fieldTypes.string,
            min: 3,
            max: 20,
        },
    },
    {
        parameter: 'description',
        name: 'description',
        restrictions: {
            type: fieldTypes.string,
            max: 40,
            optional: true,
        },
    },
    {
        parameter: 'value',
        name: 'value',
        restrictions: {
            type: fieldTypes.number,
            positive: true,
        },
    },
    {
        parameter: 'duedat',
        name: 'dueDate',
        dateType: fieldTypes.dateStart,
        restrictions: {
            type: fieldTypes.date,
            convert: true,
        },
    },
    {
        parameter: 'amountpaid',
        name: 'amountPaid',
        dateType: fieldTypes.dateEnd,
        restrictions: {
            type: fieldTypes.number,
            optional: true,
            min: 0,
        },
    },
    {
        parameter: 'type',
        name: 'type',
        restrictions: {
            type: fieldTypes.enum,
            values: [accountTypes.monthly, accountTypes.yearly],
        },
    },
    {
        parameter: 'paymentform',
        name: 'paymentForm',
        restrictions: {
            type: fieldTypes.enum,
            values: [
                accountPaymentForms.credit,
                accountPaymentForms.debitCard,
                accountPaymentForms.ticket,
            ],
        },
    },
    {
        parameter: 'status',
        name: 'status',
        restrictions: {
            type: fieldTypes.enum,
            values: [accountStatus.done, accountStatus.expired, accountStatus.pending],
        },
    },
    {
        parameter: 'isrepeat',
        name: 'isRepeat',
        restrictions: {
            type: fieldTypes.boolean,
        },
    },
    {
        parameter: 'tags',
        name: 'tags',
        restrictions: {
            type: fieldTypes.array,
            items: fieldTypes.string,
            optional: true,
        },
    },
];
