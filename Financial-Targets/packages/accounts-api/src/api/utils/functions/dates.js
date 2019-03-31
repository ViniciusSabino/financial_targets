import moment from "moment";
import { applicationEnum } from "../enumerators";

const { differences } = applicationEnum.date;

const getCurrentDate = () => moment().format();

const getDaysInCurrentMonth = () => moment().daysInMonth();

const createMomentDate = (date) => moment(date);

const getDateDifference = (differenceType, dateA, dateB) => {
    switch (differenceType) {
        case differences.milliseconds:
            return dateA.diff(dateB);
        case differences.minutes:
            return dateA.diff(dateB, differences.minutes);
        case differences.hours:
            return dateA.diff(dateB, differences.hours);
        case differences.days:
            return dateA.diff(dateB, differences.days);
        case differences.weeks:
            return dateA.diff(dateB, differences.weeks);
        case differences.months:
            return dateA.diff(dateB, differences.months);
        case differences.years:
            return dateA.diff(dateA, differences.years, true);
        default:
    }
};

const remainingPeriod = (date) => {
    const currentDate = getCurrentDate();
    return {
        inSeconds: date.diff(currentDate),
        inMinutes: date.diff(currentDate, differences.minutes),
        inHours: date.diff(currentDate, differences.hours),
        onDays: date.diff(currentDate, differences.days),
        inWeeks: date.diff(currentDate, differences.weeks),
        inMonths: date.diff(currentDate, differences.months),
        inYears: date.diff(currentDate, differences.years, true),
    };
};

export default {
    getCurrentDate,
    getDaysInCurrentMonth,
    createMomentDate,
    getDateDifference,
    remainingPeriod,
};
