import goalsUtil from '../utils/goals';

const addGoal = async goal => {
  const { targetDate } = goal;
  const goalType = goalsUtil.getGoalType(targetDate);
};

export default {
  addGoal
};
