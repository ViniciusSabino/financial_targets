import fieldTypes from '../../../../utils/constants/account-field-types';
import accountConstants from '../../../../utils/constants/account';

const { type } = accountConstants;

const accountFieldsMock = [
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
        parameter: 'type',
        name: 'type',
        description: 'Account type',
        restrictions: {
            type: fieldTypes.enum,
            values: [type.monthly, type.yearly],
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

export { accountFieldsMock };
