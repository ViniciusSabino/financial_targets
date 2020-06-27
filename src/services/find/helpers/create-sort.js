const createSort = ({ sort, order }) => ({
    [sort || 'name']: order === 'desc' ? -1 : 1,
});

export default createSort;
