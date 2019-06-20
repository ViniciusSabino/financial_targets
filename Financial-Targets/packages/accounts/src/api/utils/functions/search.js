import { applicationEnum } from '../enumerators';

const createFilterConditions = (params, allFilters) => {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const conditions = keys.reduce((acc, key, index) => {
        const filter = allFilters.find((f) => f.parameter === key);
        switch (filter.type) {
            case applicationEnum.typeFilters.inputText:
                return {
                    ...acc,
                    [filter.nameFilter]: {
                        $regex: values[index],
                        $options: 'i',
                    },
                };
            case applicationEnum.typeFilters.select:
                return {
                    ...acc,
                    [filter.nameFilter]: {
                        $eq: values[index],
                    },
                };
            case applicationEnum.typeFilters.selectBool:
                return {
                    ...acc,
                    [filter.nameFilter]: values[index],
                };
            case applicationEnum.typeFilters.dateStart:
                return {
                    ...acc,
                    [filter.nameFilter]: {
                        $gte: values[index],
                    },
                };
            case applicationEnum.typeFilters.dateEnd:
                return {
                    ...acc,
                    [filter.nameFilter]: {
                        $lte: values[index],
                        ...acc[filter.nameFilter],
                    },
                };
            case applicationEnum.typeFilters.selectMultiple:
                return {
                    ...acc,
                    [filter.nameFilter]: {
                        $in: values[index].split(','),
                    },
                };
            default:
                return { ...acc };
        }
    }, {});

    return conditions;
};

const sortBy = (order, sort) => {
    const orderObject = {};
    orderObject[sort] = order === 'desc' ? -1 : 1;
    return orderObject;
};

export default {
    createFilterConditions,
    sortBy,
};
