export default (sort, order = 'asc') => {
    const mongodbOrder = {};

    mongodbOrder[sort] = order === 'desc' ? -1 : 1;

    return mongodbOrder;
};
