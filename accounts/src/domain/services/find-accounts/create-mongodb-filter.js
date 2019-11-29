import accountFields from '../../../utils/constants/account-fields';
import accountFieldTypes from '../../../utils/constants/account-field-types';

const createMongoFilter = (fields) => {
    const keys = Object.keys(fields);

    const values = Object.values(fields);

    const mongodbFilter = keys.reduce((condition, key, index) => {
        const filter = accountFields.find((f) => f.parameter === key);

        if (filter.restrictions.type === accountFieldTypes.number) {
            return {
                ...condition,

                [filter.name]: {
                    $eq: values[index],
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.string) {
            return {
                ...condition,

                [filter.name]: {
                    $regex: values[index],

                    $options: 'i',
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.enum) {
            return {
                ...condition,

                [filter.name]: {
                    $eq: values[index],
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.boolean) {
            return {
                ...condition,

                [filter.name]: values[index],
            };
        }

        if (filter.restrictions.type === accountFieldTypes.date) {
            if (filter.dateType === accountFieldTypes.dateStart) {
                return {
                    ...condition,

                    [filter.name]: {
                        $gte: values[index],
                    },
                };
            }

            return {
                ...condition,

                [filter.name]: {
                    $lte: values[index],

                    ...condition[filter.name],
                },
            };
        }

        if (filter.restrictions.type === accountFieldTypes.array) {
            return {
                ...condition,

                [filter.name]: {
                    $in: values[index].split(','),
                },
            };
        }

        return { ...condition };
    }, {});

    return mongodbFilter;
};

export default createMongoFilter;
