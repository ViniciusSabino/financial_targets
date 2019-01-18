import functions from "../utils/functions";
import enumAccount from "../utils/enumerators/accounts";

const setAccountDate = (dueDate, type) => {
    const days = functions.getDaysInCurrentMonth();
    const dueDateMoment = functions.createMomentDate(dueDate);
    const ajustedDate =
        type === enumAccount.type.monthly
            ? dueDateMoment.add(days, "days")
            : dueDateMoment.add(12, "months");
    return ajustedDate;
};

export default {
    setAccountDate
};
