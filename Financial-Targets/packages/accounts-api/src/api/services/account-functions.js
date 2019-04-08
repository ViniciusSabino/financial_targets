import date from "../utils/functions/dates";

import { accountEnum, applicationEnum } from "../utils/enumerators";

const {
    date: { differences },
} = applicationEnum;

const setAccountDate = (dueDate, type) => {
    const days = date.getDaysInCurrentMonth();
    const dueDateMoment = date.createMomentDate(dueDate);

    return type === accountEnum.type.monthly
        ? dueDateMoment.add(days, differences.days)
        : dueDateMoment.add(12, differences.months);
};

export default {
    setAccountDate,
};
