const createMongoDbSort = (sort: string, order = 'asc'): object => ({
    [sort]: order === 'desc' ? -1 : 1,
});

export default createMongoDbSort;
