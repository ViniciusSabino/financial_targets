import enumerators from "./enumerators";
import functions from "./functions";

const getGoalType = targetDate => {
    const {
        goals: { type },
        others: {
            date: { differences }
        }
    } = enumerators;

    const targetDateCompare = functions.createMomentDate(targetDate);
    const daysDifference = functions.getDateDifference(
        differences.days,
        targetDateCompare,
        functions.getCurrentDate()
    );

    const goalType = do {
        if (daysDifference >= 0 && daysDifference <= 92) type.veryShortRun;
        else if (daysDifference > 92 && daysDifference <= 730) type.shortRun;
        else if (daysDifference > 730 && daysDifference <= 1825) type.middleRun;
        else type.longRun;
    };

    return goalType;
};

export default {
    getGoalType
};
