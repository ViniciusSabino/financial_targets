import { datesEnum, accountEnum } from '../../utils/enumerators';
import { getDaysInCurrentMonth, createMomentDate } from '../../utils/functions/dates';

const setAccountDate = (type, dueDate) => {
    const days = getDaysInCurrentMonth();

    const dueDateMoment = createMomentDate(dueDate);

    switch (type) {
        case accountEnum.type.monthly:
            return dueDateMoment.add(days, datesEnum.differences.days);
        case accountEnum.type.yearly:
        default:
            return dueDateMoment.add(1, datesEnum.differences.years);
    }
};

export default setAccountDate;
