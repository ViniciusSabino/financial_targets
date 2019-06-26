import dictionary from '../utils/dictionaries';

const validMakePayment = (context, next) => {
    const {
        headers: { userid },
    } = context.request;

    const errors = [];

    if (!Number(userid)) errors.push(dictionary.userIdIsEmpty);

    return errors.length ? context.badRequest(errors) : next();
};

export default validMakePayment;
