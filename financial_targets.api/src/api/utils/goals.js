import enumerators from './enumerators';
import functions from './functions';

const getGoalType = targetDate => {
  const { type } = enumerators.goals;
  const dateDifferences = enumerators.others.date.differences;
  const currentDate = functions.getCurrentDate();
  const targetDateCompare = functions.createMomentDate(targetDate);
  const daysDifference = functions.getDateDifference(dateDifferences.days, targetDateCompare, currentDate);
  const goalType = do {
    if (daysDifference >= 0 && daysDifference <= 60) type.shortRun;
    else if (daysDifference > 60 && daysDifference <= 365) type.middleRun;
    else type.longRun;
  };

  return goalType;
};

export default {
  getGoalType
};
