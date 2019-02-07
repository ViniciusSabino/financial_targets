import goalsUtil from "../utils/modules/goals";
import Goal from "../models/goal";
import api from "../utils/functions/api";
import date from "../utils/functions/dates";

const addGoal = async goal => {
    const { targetDate } = goal;
    const goalType = goalsUtil.getGoalType(targetDate);
    const goalInput = new Goal({ ...goal, goalType });
    const result = await goalInput.save();

    return result;
};

const listAllGoals = async userId => {
    const goals = await Goal.find({ userId });

    return api.result(goals);
};

const details = async params => {
    const goal = await Goal.findOne({
        userId: params.userId,
        _id: params.goalId
    }).lean();

    const { targetDate } = goal;

    const missing = targetDate |> date.createMomentDate |> date.remainingPeriod;

    return api.result({ ...goal, missing });
};

export default {
    addGoal,
    listAllGoals,
    details
};
