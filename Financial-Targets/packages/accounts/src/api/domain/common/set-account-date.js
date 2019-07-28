import moment from 'moment';

import { accountEnum, datesEnum } from '../../utils/enumerators';

const setAccountDate = (type, dueDate) => {
    const days = moment().daysInMonth();

    switch (type) {
        case accountEnum.type.monthly:
            return moment(dueDate).add(days, datesEnum.differences.days);
        case accountEnum.type.yearly:
        default:
            return moment(dueDate).add(1, datesEnum.differences.years);
    }
};

export default setAccountDate;
