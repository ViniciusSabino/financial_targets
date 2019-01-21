import moment from "moment";

import enumerators from "./enumerators";

const { application } = enumerators;

const getCurrentDate = () => moment().format();

const getDaysInCurrentMonth = () => moment().daysInMonth();

const createMomentDate = date => moment(date);

const getDateDifference = (differenceType, dateA, dateB) => {
    const { differences } = enumerators.application.date;
    switch (differenceType) {
        case differences.milliseconds:
            return dateA.diff(dateB);
        case differences.minutes:
            return dateA.diff(dateB, differences.minutes);
        case differences.hours:
            return dateA.diff(dateB, differences.hours);
        case differences.days:
            return dateA.diff(dateB, differences.days);
        case differences.weeks:
            return dateA.diff(dateB, differences.weeks);
        case differences.months:
            return dateA.diff(dateB, differences.months);
        case differences.years:
            return dateA.diff(dateA, differences.years, true);
    }
};

const createResult = (data, page = 1, perPage = 20) => {
    return {
        count: data?.length ? data.length : 0,
        page,
        perPage,
        data
    };
};

const createFilterConditions = (params, allFilters) => {
    const keys = Object.keys(params);
    const values = Object.values(params);
    const conditions = {};

    keys.forEach((key, index) => {
        const filter = allFilters.find(f => f.name === key);
        if (filter) {
            switch (filter.type) {
                case application.typeFilters.inputText:
                    conditions[filter.nameFilter] = {
                        $regex: values[index],
                        $options: "i"
                    };
                    break;
                case application.typeFilters.select:
                    conditions[filter.nameFilter] = {
                        $eq: values[index]
                    };
                    break;
                case application.typeFilters.selectBool:
                    conditions[filter.nameFilter] = values[index];
                    break;
                case application.typeFilters.dateStart:
                    conditions[filter.nameFilter] = {
                        $gte: values[index],
                        ...conditions[filter.nameFilter]
                    };
                    break;
                case application.typeFilters.dateEnd:
                    conditions[filter.nameFilter] = {
                        $lte: values[index],
                        ...conditions[filter.nameFilter]
                    };
                    break;
                case application.typeFilters.selectMultiple:
                    conditions[filter.nameFilter] = {
                        $in: JSON.parse(values[index])
                    };
            }
        }
    });

    return conditions;
};

export default {
    getCurrentDate,
    getDaysInCurrentMonth,
    createMomentDate,
    getDateDifference,
    createResult,
    createFilterConditions
};
