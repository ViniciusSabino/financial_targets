import { applicationEnum } from "../enumerators";

const createFilterConditions = (params, allFilters) => {
    const keys = Object.keys(params);
    const values = Object.values(params);
    const conditions = {};

    keys.forEach((key, index) => {
        const filter = allFilters.find((f) => f.parameter === key);
        if (filter) {
            switch (filter.type) {
                case applicationEnum.typeFilters.inputText:
                    conditions[filter.nameFilter] = {
                        $regex: values[index],
                        $options: "i",
                    };
                    break;
                case applicationEnum.typeFilters.select:
                    conditions[filter.nameFilter] = {
                        $eq: values[index],
                    };
                    break;
                case applicationEnum.typeFilters.selectBool:
                    conditions[filter.nameFilter] = values[index];
                    break;
                case applicationEnum.typeFilters.dateStart:
                    conditions[filter.nameFilter] = {
                        $gte: values[index],
                        ...conditions[filter.nameFilter],
                    };
                    break;
                case applicationEnum.typeFilters.dateEnd:
                    conditions[filter.nameFilter] = {
                        $lte: values[index],
                        ...conditions[filter.nameFilter],
                    };
                    break;
                case applicationEnum.typeFilters.selectMultiple:
                    conditions[filter.nameFilter] = {
                        $in: JSON.parse(values[index]),
                    };
                    break;
                default:
            }
        }
    });

    return conditions;
};

const sortBy = (order, sort) => {
    const orderObject = {};
    orderObject[sort] = order === "desc" ? -1 : 1;
    return orderObject;
};

export default {
    createFilterConditions,
    sortBy,
};
