import accountFields from '../../../utils/constants/account-fields';
import accountFieldTypes from '../../../utils/constants/account-field-types';

const createMongoFilter = (fields) => {
    const keys = Object.keys(fields);

    const mongodbFilter = keys.reduce((condition, key) => {
        const filter = accountFields.find((f) => f.parameter === key);

        if (!filter) return { ...condition };

        if (filter.restrictions.type === accountFieldTypes.number) {
            return {
                ...condition,

                [filter.name]: {
                    $eq: fields[filter.parameter],
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.string) {
            return {
                ...condition,

                [filter.name]: {
                    $regex: fields[filter.parameter],

                    $options: 'i',
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.enum) {
            return {
                ...condition,

                [filter.name]: {
                    $eq: fields[filter.parameter],
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.boolean) {
            return {
                ...condition,

                [filter.name]: fields[filter.parameter],
            };
        }

        if (filter.restrictions.type === accountFieldTypes.date) {
            if (filter.dateType === accountFieldTypes.dateStart) {
                return {
                    ...condition,

                    [filter.name]: {
                        $gte: fields[filter.parameter],
                    },
                };
            }

            return {
                ...condition,

                [filter.name]: {
                    $lte: fields[filter.parameter],

                    ...condition[filter.name],
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.array) {
            return {
                ...condition,

                [filter.name]: {
                    $in: fields[filter.parameter].split(','),
                },
            };
        }

        return { ...condition };
    }, {});

    return mongodbFilter;
};

export default createMongoFilter;
