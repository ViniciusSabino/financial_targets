const createMongoDbSort = (sort, order = 'asc') => {
    const mongodbOrder = {};

    mongodbOrder[sort] = order === 'desc' ? -1 : 1;

    return mongodbOrder;
};

export default createMongoDbSort;
