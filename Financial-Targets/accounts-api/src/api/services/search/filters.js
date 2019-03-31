import { application } from "../../utils/enumerators";

const accountFilters = [
    {
        parameter: "name",
        nameFilter: "name",
        type: application.typeFilters.inputText,
    },
    {
        parameter: "duedatestart",
        nameFilter: "dueDate",
        type: application.typeFilters.dateStart,
    },
    {
        parameter: "duedateend",
        nameFilter: "dueDate",
        type: application.typeFilters.dateEnd,
    },
    {
        parameter: "status",
        nameFilter: "status",
        type: application.typeFilters.select,
    },
    {
        parameter: "type",
        nameFilter: "type",
        type: application.typeFilters.select,
    },
    {
        parameter: "paymentform",
        nameFilter: "paymentForm",
        type: application.typeFilters.select,
    },
    {
        parameter: "isrepeat",
        nameFilter: "isRepeat",
        type: application.typeFilters.selectBool,
    },
    {
        parameter: "tags",
        nameFilter: "tags",
        type: application.typeFilters.selectMultiple,
    },
];

export default accountFilters;
