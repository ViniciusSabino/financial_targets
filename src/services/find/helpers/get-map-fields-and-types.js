const getMapFieldsAndTypes = (filterableFields) => {
    const arrayMapping = [];

    const types = Object.keys(filterableFields);

    types.forEach((type) => {
        const { fields } = filterableFields[type];

        if (fields?.length) {
            const mapItems = fields.map((field) => [field, type]);

            arrayMapping.push(...mapItems);
        }
    });

    return new Map(arrayMapping);
};

export default getMapFieldsAndTypes;
