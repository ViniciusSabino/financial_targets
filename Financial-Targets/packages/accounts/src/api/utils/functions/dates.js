import moment from 'moment';

const getCurrentMonthOrADate = (date = moment().format()) => moment(date).month() + 1;

const getCurrentYearOrADate = (date = moment().format()) => moment(date).year();

export { getCurrentMonthOrADate, getCurrentYearOrADate };
