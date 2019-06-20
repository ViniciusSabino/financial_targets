import { getDaysInCurrentMonth, createMomentDate } from '../../utils/functions/dates';

import { accountEnum, applicationEnum } from '../../utils/enumerators';

const {
    date: { differences },
} = applicationEnum;

const setAccountDate = (dueDate, type) => {
    const days = getDaysInCurrentMonth();

    const dueDateMoment = createMomentDate(dueDate);

    return type === accountEnum.type.monthly
        ? dueDateMoment.add(days, differences.days).format()
        : dueDateMoment.add(1, differences.years).format();
};

export { setAccountDate };
