import moment from 'moment';

import { accountTypes } from '../../helpers/constants';

export default (type, dueDate) => {
    const days = moment().daysInMonth();

    if (type === accountTypes.monthly) {
        return moment(dueDate).add(days, 'days');
    }

    return moment(dueDate).add(1, 'years');
};
