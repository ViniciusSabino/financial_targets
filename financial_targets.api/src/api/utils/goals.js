import enumerators from './enumerators';
import functions from './functions';

const getGoalType = targetDate => {
  const {
    goals: { type },
    others: {
      date: { differences }
    }
  } = enumerators;

  const targetDateCompare = functions.createMomentDate(targetDate);
  const daysDifference = functions.getDateDifference(differences.days, targetDateCompare, functions.getCurrentDate());

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
