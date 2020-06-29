import { FIELD_TYPES } from '../../../utils/enums';
import constants from '../../../utils/constants';

const { accountSchema } = constants;

const getFilterableFields = () => ({
    [FIELD_TYPES.number]: {
        fields: [accountSchema.value.name, accountSchema.amountPaid.name],
        getFilter: (key, value) => ({
            [key]: {
                $eq: value,
            },
        }),
    },

    [FIELD_TYPES.enum]: {
        fields: [
            accountSchema.type.name,
            accountSchema.status.name,
            accountSchema.paymentMethod.name,
        ],
        getFilter: (key, value) => ({
            [key]: {
                $eq: value,
            },
        }),
    },

    [FIELD_TYPES.string]: {
        fields: [accountSchema.name.name],
        getFilter: (key, value) => ({
            [key]: {
                $regex: value,
                $options: 'i',
            },
        }),
    },

    [FIELD_TYPES.boolean]: {
        fields: [accountSchema.isRepeat.name],
        getFilter: (key, value) => ({
            [key]: value,
        }),
    },

    [FIELD_TYPES.array]: {
        fields: [accountSchema.tags.name],
        getFilter: (key, value) => ({
            [key]: {
                $in: value.split(','),
            },
        }),
    },
});

export default getFilterableFields;
