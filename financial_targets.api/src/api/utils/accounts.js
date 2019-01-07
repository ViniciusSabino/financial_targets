import functions from '../utils/functions';
import enumerators from '../utils/enumerators';

const setAccountDate = (dueDate, type) => {
  const days = functions.getDaysInCurrentMonth();
  const dueDate = functions.createMomentDate(dueDate);
  const ajustedDate = type === enumerators.account.type.monthly ? dueDate.add(days, 'days') : dueDate.add(12, 'months');
  return ajustedDate;
};

export default {
  setAccountDate
};
