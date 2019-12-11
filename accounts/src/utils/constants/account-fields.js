/* eslint-disable max-lines */
import accountConstants from './account';
import fieldTypes from './account-field-types';

const { paymentForm, status, type } = accountConstants;

// fastest validator restrictions

const accountFields = [
    {
        parameter: 'userid',
        name: 'userId',
        description: 'User who created the account',
        restrictions: {
            type: fieldTypes.number,
            positive: true,
        },
    },
    {
        parameter: 'name',
        name: 'name',
        description: 'Account name',
        restrictions: {
            type: fieldTypes.string,
            min: 3,
            max: 20,
        },
    },
    {
        parameter: 'description',
        name: 'description',
        description: 'Account description',
        restrictions: {
            type: fieldTypes.string,
            max: 40,
            optional: true,
        },
    },
    {
        parameter: 'value',
        name: 'value',
        description: 'Account amount',
        restrictions: {
            type: fieldTypes.number,
            positive: true,
        },
    },
    {
        parameter: 'duedatestart',
        name: 'dueDate',
        description: 'Date the bill payment needs to be made',
        dateType: fieldTypes.dateStart,
        restrictions: {
            type: fieldTypes.date,
            convert: true,
        },
    },
    {
        parameter: 'duedateend',
        name: 'dueDate',
        description: 'Date the bill payment needs to be made',
        dateType: fieldTypes.dateEnd,
        isNotSchema: true,
        restrictions: {
            type: fieldTypes.date,
            convert: true,
        },
    },
    {
        parameter: 'amountpaid',
        name: 'amountPaid',
        description: 'Amount paid from account',
        dateType: fieldTypes.number,
        restrictions: {
            type: fieldTypes.number,
            optional: true,
            min: 0,
        },
    },
    {
        parameter: 'type',
        name: 'type',
        description: 'Account type',
        restrictions: {
            type: fieldTypes.enum,
            values: [type.monthly, type.yearly],
        },
    },
    {
        parameter: 'paymentform',
        name: 'paymentForm',
        description: 'Payment method to the account',
        restrictions: {
            type: fieldTypes.enum,
            values: [paymentForm.credit, paymentForm.debitCard, paymentForm.ticket],
        },
    },
    {
        parameter: 'status',
        name: 'status',
        description: 'Account status',
        restrictions: {
            type: fieldTypes.enum,
            values: [status.done, status.expired, status.pending],
        },
    },
    {
        parameter: 'isrepeat',
        name: 'isRepeat',
        description: 'Indicates if the account will be repeat',
        restrictions: {
            type: fieldTypes.boolean,
        },
    },
    {
        parameter: 'tags',
        name: 'tags',
        description: 'The tags that rate the account',
        restrictions: {
            type: fieldTypes.array,
            items: fieldTypes.string,
            optional: true,
        },
    },
];

export default accountFields;
