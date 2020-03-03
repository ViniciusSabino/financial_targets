import { FieldTypes } from '../enum';

const getFilterableFields = () => ({
    [FieldTypes.number]: {
        fields: ['value', 'amountPaid'],
        getFilter: (key, value) => ({
            [key]: {
                $eq: value,
            },
        }),
    },

    [FieldTypes.enum]: {
        fields: ['type', 'status', 'paymentForm'],
        getFilter: (key, value) => ({
            [key]: {
                $eq: value,
            },
        }),
    },

    [FieldTypes.string]: {
        fields: ['name'],
        getFilter: (key, value) => ({
            [key]: {
                $regex: value,
                $options: 'i',
            },
        }),
    },

    [FieldTypes.boolean]: {
        fields: ['isRepeat'],
        getFilter: (key, value) => ({
            [key]: value,
        }),
    },

    [FieldTypes.array]: {
        fields: ['tags'],
        getFilter: (key, value) => ({
            [key]: {
                $in: value.split(','),
            },
        }),
    },
});

export default getFilterableFields;
