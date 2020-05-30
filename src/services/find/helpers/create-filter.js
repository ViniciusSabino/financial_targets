import getMapFieldsAndTypes from './get-map-fields-and-types';
import getFilterableFields from './get-filterable-fields';

const createFilter = (fields) => {
    const keys = Object.keys(fields);

    const filterableFields = getFilterableFields();
    const mapFieldTypes = getMapFieldsAndTypes(filterableFields);

    const filter = keys.reduce((currentFilter, key) => {
        const type = mapFieldTypes.get(key);

        if (!type) return { ...currentFilter };

        const fieldType = filterableFields[type];

        const condition = fieldType.getFilter(key, fields[key]);

        return { ...currentFilter, ...condition };
    }, {});

    return filter;
};

export default createFilter;
