import getFilterableFields from './get-filterable-fields';

const createMap = (fields) => {
    const mapArray = [];

    const fieldTypeKeys = Object.keys(fields);

    fieldTypeKeys.forEach((fieldType) => {
        const accountFields = fields[fieldType].fields;

        if (accountFields && accountFields.length) {
            const mapItems = accountFields.map((fieldName) => [fieldName, fieldType]);

            mapArray.push(...mapItems);
        }
    });

    return mapArray;
};

const getMapFieldsAndTypes = () => {
    const fields = getFilterableFields();
    const mapping = createMap(fields);

    return new Map(mapping);
};

export default getMapFieldsAndTypes;
