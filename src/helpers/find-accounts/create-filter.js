import { getMapFieldsAndTypes, getFilterableFields } from './index';

const createFilter = (fields) => {
    const keys = Object.keys(fields);

    const filter = keys.reduce((condition, key) => {
        const fieldType = getMapFieldsAndTypes().get(key);

        if (!fieldType) return { ...condition };

        const objectFieldType = getFilterableFields()[fieldType];

        return {
            ...condition,
            ...objectFieldType.getFilter(key, fields[key]),
        };
    }, {});

    return filter;
};

export default createFilter;
