import date from "../functions/dates";
import enumAccount from "../enumerators/accounts";

const setAccountDate = (dueDate, type) => {
    const days = date.getDaysInCurrentMonth();
    const dueDateMoment = date.createMomentDate(dueDate);
    const ajustedDate =
        type === enumAccount.type.monthly
            ? dueDateMoment.add(days, "days")
            : dueDateMoment.add(12, "months");
    return ajustedDate;
};

export default {
    setAccountDate
};
