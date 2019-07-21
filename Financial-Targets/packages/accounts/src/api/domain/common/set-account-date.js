import { accountEnum } from '../../utils/enumerators';
import { getDaysInCurrentMonth, addDaysAtTime, addYearsAtTime } from '../../utils/functions/dates';

const setAccountDate = (type, dueDate) => {
    const days = getDaysInCurrentMonth();

    switch (type) {
        case accountEnum.type.monthly:
            return addDaysAtTime(dueDate, days);
        case accountEnum.type.yearly:
        default:
            return addYearsAtTime(dueDate, 1);
    }
};

export default setAccountDate;
