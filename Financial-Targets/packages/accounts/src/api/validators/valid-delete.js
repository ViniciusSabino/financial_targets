import dictionary from '../utils/dictionaries/account-dictionary';

const validDelete = (context, next) => {
    const {
        headers: { userid },
    } = context.request;

    const errors = [];

    if (!Number(userid)) errors.push(dictionary.userIdIsEmpty);

    return errors.length ? context.badRequest(errors) : next();
};

export default validDelete;
