import findAccountFields from './find-account-fields';
import { FieldTypes } from '../enum';

const createMongoFilter = (fields) => {
    const keys = Object.keys(fields);

    const mongodbFilter = keys.reduce((condition, key) => {
        const filter = findAccountFields.find((f) => f.parameter === key);

        if (!filter) return { ...condition };

        if (filter.type === FieldTypes.number || filter.type === FieldTypes.enum) {
            return {
                ...condition,

                [filter.name]: {
                    $eq: fields[filter.parameter],
                },
            };
        }

        if (filter.type === FieldTypes.string) {
            return {
                ...condition,

                [filter.name]: {
                    $regex: fields[filter.parameter],

                    $options: 'i',
                },
            };
        }

        if (filter.type === FieldTypes.boolean) {
            return {
                ...condition,

                [filter.name]: fields[filter.parameter],
            };
        }

        if (filter.type === FieldTypes.date) {
            if (filter.dateType === FieldTypes.dateStart) {
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
                    ...condition[filter.name],
                    $lte: fields[filter.parameter],
                },
            };
        }

        if (filter.type === FieldTypes.array) {
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
