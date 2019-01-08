import functions from '../utils/functions';
import enumerators from '../utils/enumerators';

const setAccountDate = (dueDate, type) => {
  const days = functions.getDaysInCurrentMonth();
  const dueDateMoment = functions.createMomentDate(dueDate);
  const ajustedDate = type === enumerators.account.type.monthly ? dueDateMoment.add(days, 'days') : dueDateMoment.add(12, 'months');
  return ajustedDate;
};

export default {
  setAccountDate
};
