import goalsUtil from "../utils/modules/goals";
import Goal from "../models/goal";

const addGoal = async goal => {
    const { targetDate } = goal;
    const goalType = goalsUtil.getGoalType(targetDate);
    const goalInput = new Goal({ ...goal, goalType });
    const result = await goalInput.save();

    return result;
};

export default {
    addGoal
};
