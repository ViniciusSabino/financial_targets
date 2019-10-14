import { accountFields, fieldTypes } from '../../../helpers/constants';

export default (fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const mongodbFilter = keys.reduce((condition, key, index) => {
        const filter = accountFields.find((f) => f.parameter === key);

        if (filter.restrictions.type === fieldTypes.number) {
            return {
                ...condition,
                [filter.name]: {
                    $eq: values[index],
                },
            };
        }

        if (filter.restrictions.type === fieldTypes.string) {
            return {
                ...condition,
                [filter.name]: {
                    $regex: values[index],
                    $options: 'i',
                },
            };
        }

        if (filter.restrictions.type === fieldTypes.enum) {
            return {
                ...condition,
                [filter.name]: {
                    $eq: values[index],
                },
            };
        }

        if (filter.restrictions.type === fieldTypes.boolean) {
            return {
                ...condition,
                [filter.name]: values[index],
            };
        }

        if (filter.restrictions.type === fieldTypes.date) {
            if (filter.dateType === fieldTypes.dateStart) {
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

        if (filter.restrictions.type === fieldTypes.array) {
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
