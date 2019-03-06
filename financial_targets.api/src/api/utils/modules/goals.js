import enumerators from "../enumerators";
import date from "../functions/dates";

const getGoalType = (targetDate) => {
    const {
        goals: { type },
        application: {
            date: { differences },
        },
    } = enumerators;

    const targetDateCompare = date.createMomentDate(targetDate);
    const daysDifference = date.getDateDifference(
        differences.days,
        targetDateCompare,
        date.getCurrentDate()
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
    getGoalType,
};
