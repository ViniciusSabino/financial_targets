import { mongoFiltersEnum } from '../enumerators';

const { typeFilters } = mongoFiltersEnum;

const accountFilters = [
    {
        parameter: 'userid',
        name: 'userId',
        type: typeFilters.number,
    },
    {
        parameter: 'name',
        name: 'name',
        type: typeFilters.inputText,
    },
    {
        parameter: 'duedatestart',
        name: 'dueDate',
        type: typeFilters.dateStart,
    },
    {
        parameter: 'duedateend',
        name: 'dueDate',
        type: typeFilters.dateEnd,
    },
    {
        parameter: 'status',
        name: 'status',
        type: typeFilters.select,
    },
    {
        parameter: 'type',
        name: 'type',
        type: typeFilters.select,
    },
    {
        parameter: 'paymentform',
        name: 'paymentForm',
        type: typeFilters.select,
    },
    {
        parameter: 'isrepeat',
        name: 'isRepeat',
        type: typeFilters.boolean,
    },
    {
        parameter: 'tags',
        name: 'tags',
        type: typeFilters.selectMultiple,
    },
];

export default accountFilters;
