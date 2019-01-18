import dictionary from "../utils/dictionaries";
import functions from "../utils/functions";

const validCreate = (ctx, next) => {
    const goal = ctx.request.body;
    const errors = validDataSubmitted(goal);
    return errors.length ? ctx.badRequest({ errors }) : next();
};

const validDataSubmitted = goal => {
    const errors = [];
    const currentDate = functions.getCurrentDate();
    if (!goal.name) errors.push(dictionary.goals.nameIsEmpty);

    if (!goal.amount || goal.amount < 0)
        errors.push(dictionary.goals.amountIsEmpty);

    if (!goal.targetDate) errors.push(dictionary.goals.targetDateIsEmpty);

    if (goal.targetDate < currentDate)
        errors.push(dictionary.goals.targetDateIsInvalid);

    if (!goal.userId) errors.push(dictionary.goals.userIdIsEmpty);

    return errors;
};

export default {
    validCreate
};
