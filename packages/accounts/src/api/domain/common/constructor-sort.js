const constructorSort = (sort, order = 'asc') => {
    const mongoOrder = {};

    mongoOrder[sort] = order === 'desc' ? -1 : 1;

    return mongoOrder;
};

export default constructorSort;
