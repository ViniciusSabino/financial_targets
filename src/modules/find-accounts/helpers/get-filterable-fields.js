import { FIELD_TYPES } from '../../../utils/enums';

const getFilterableFields = () => ({
    [FIELD_TYPES.number]: {
        fields: ['value', 'amountPaid'],
        getFilter: (key, value) => ({
            [key]: {
                $eq: value,
            },
        }),
    },

    [FIELD_TYPES.enum]: {
        fields: ['type', 'status', 'paymentMethod'],
        getFilter: (key, value) => ({
            [key]: {
                $eq: value,
            },
        }),
    },

    [FIELD_TYPES.string]: {
        fields: ['name'],
        getFilter: (key, value) => ({
            [key]: {
                $regex: value,
                $options: 'i',
            },
        }),
    },

    [FIELD_TYPES.boolean]: {
        fields: ['isRepeat'],
        getFilter: (key, value) => ({
            [key]: value,
        }),
    },

    [FIELD_TYPES.array]: {
        fields: ['tags'],
        getFilter: (key, value) => ({
            [key]: {
                $in: value.split(','),
            },
        }),
    },
});

export default getFilterableFields;
