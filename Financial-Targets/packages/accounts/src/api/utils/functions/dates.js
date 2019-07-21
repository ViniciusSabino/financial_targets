import moment from 'moment';

import { datesEnum } from '../enumerators';

const getCurrentDate = () => moment();

const getDaysInCurrentMonth = () => moment().daysInMonth();

const createMomentDate = (date) => moment(date);

const getCurrentMonthOrADate = (date = moment().format()) => moment(date).month() + 1;

const getCurrentYearOrADate = (date = moment().format()) => moment(date).year();

const addDaysAtTime = (date = moment().format(), days) =>
    moment(date).add(days, datesEnum.differences.days);

const addYearsAtTime = (date = moment().format(), years) =>
    moment(date).add(years, datesEnum.differences.years);

export {
    getCurrentDate,
    getDaysInCurrentMonth,
    createMomentDate,
    getCurrentMonthOrADate,
    getCurrentYearOrADate,
    addDaysAtTime,
    addYearsAtTime,
};
