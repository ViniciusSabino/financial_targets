import findAccountsFilters from '../utils/constants/find-accounts-filters';
import { mongoFiltersEnum } from '../utils/enumerators';
import { findAccounts } from '../database/mongodb/queries';

const { typeFilters } = mongoFiltersEnum;

const buildMongoFilter = (fields) => {
    // fields (keys / values)
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const mongoFilter = keys.reduce((condition, key, index) => {
        const filter = findAccountsFilters.find((f) => f.parameter === key);
        switch (filter?.type) {
            case typeFilters.number:
                return {
                    ...condition,
                    [filter.name]: {
                        $eq: values[index],
                    },
                };
            case typeFilters.inputText:
                return {
                    ...condition,
                    [filter.name]: {
                        $regex: values[index],
                        $options: 'i',
                    },
                };
            case typeFilters.select:
                return {
                    ...condition,
                    [filter.name]: {
                        $eq: values[index],
                    },
                };
            case typeFilters.boolean:
                return {
                    ...condition,
                    [filter.name]: values[index],
                };
            case typeFilters.dateStart:
                return {
                    ...condition,
                    [filter.name]: {
                        $gte: values[index],
                    },
                };
            case typeFilters.dateEnd:
                return {
                    ...condition,
                    [filter.name]: {
                        $lte: values[index],
                        ...condition[filter.name],
                    },
                };
            case typeFilters.selectMultiple:
                return {
                    ...condition,
                    [filter.name]: {
                        $in: values[index].split(','),
                    },
                };
            default:
                return { ...condition };
        }
    }, {});

    return mongoFilter;
};

export default async ({ sort, order, limit, ...fields }) => {
    const mongoFilter = buildMongoFilter(fields);

    const accounts = await findAccounts({ mongoFilter, sort, order, limit });

    return accounts;
};
