import { FieldTypes } from '../../types';

const findAccountFields = [
    {
        parameter: 'userid',
        name: 'userId',
        type: FieldTypes.number,
    },
    {
        parameter: 'name',
        name: 'name',
        type: FieldTypes.string,
    },
    {
        parameter: 'description',
        name: 'description',
        type: FieldTypes.string,
    },
    {
        parameter: 'value',
        name: 'value',
        type: FieldTypes.number,
    },
    {
        parameter: 'duedatestart',
        name: 'dueDate',
        dateType: FieldTypes.dateStart,
        type: FieldTypes.date,
    },
    {
        parameter: 'duedateend',
        name: 'dueDate',
        dateType: FieldTypes.dateEnd,
        type: FieldTypes.date,
    },
    {
        parameter: 'amountpaid',
        name: 'amountPaid',
        type: FieldTypes.number,
    },
    {
        parameter: 'type',
        name: 'type',
        type: FieldTypes.enum,
    },
    {
        parameter: 'paymentform',
        name: 'paymentForm',
        type: FieldTypes.enum,
    },
    {
        parameter: 'status',
        name: 'status',
        type: FieldTypes.enum,
    },
    {
        parameter: 'isrepeat',
        name: 'isRepeat',
        type: FieldTypes.boolean,
    },
    {
        parameter: 'tags',
        name: 'tags',
        type: FieldTypes.array,
    },
];

export default findAccountFields;
