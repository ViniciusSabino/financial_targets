import moment from 'moment';

import { applicationEnum } from '../enumerators';

const { differences } = applicationEnum.date;

const getCurrentDate = () => moment().format();

const getDaysInCurrentMonth = () => moment().daysInMonth();

const createMomentDate = (date) => moment(date);

const getDateDifference = (differenceType, largeDate, minorDate) => {
    switch (differenceType) {
        case differences.minutes:
            return largeDate.diff(minorDate, differences.minutes);

        case differences.hours:
            return largeDate.diff(minorDate, differences.hours);

        case differences.days:
            return largeDate.diff(minorDate, differences.days);

        case differences.weeks:
            return largeDate.diff(minorDate, differences.weeks);

        case differences.months:
            return largeDate.diff(minorDate, differences.months);

        case differences.years:
            return largeDate.diff(minorDate, differences.years, false);

        default:
            return largeDate.diff(minorDate, differences.years);
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

const getCurrentMonth = (date = moment().format()) => moment(date).month() + 1;

const getCurrentYear = (date = moment().format()) => moment(date).year();

export {
    getCurrentDate,
    getDaysInCurrentMonth,
    createMomentDate,
    getDateDifference,
    remainingPeriod,
    getCurrentMonth,
    getCurrentYear,
};
