import moment from 'moment';

const getCurrentDate = () => moment().format();

const getDaysInCurrentMonth = () => moment().daysInMonth();

const createMomentDate = date => moment(date);

export default {
  getCurrentDate,
  getDaysInCurrentMonth,
  createMomentDate
};
